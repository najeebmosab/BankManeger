const express = require('express');
const router = express.Router();
const UserModel = require("../Models/UserModel");
const bcrypt = require('bcrypt');
const jwt = require("../JWT/tokenApi");

router.get("/", async (req, res) => {
    const Users = await UserModel.find();
    res.send({ "Users": Users });
});

router.get("/:id", async (req, res) => {
    try {
        const User = await UserModel.findById(req.params.id);
        console.log(User);
        if (!User) {
            res.status(404).json({ error: "User Not Found" });
            return;
        }
        res.json({ User: User });
    }
    catch (error) {
        res.status(500).json({ errorr: "Somtheing wrong" });
    }
});


router.put("/:id", async (req, res) => {
    try {
        console.log(req.body);
        const result = await UserModel.replaceOne({ _id: req.params.id }, req.body);
        console.log(result.modifiedCount);

        const User = await UserModel.findById(req.params.id);
        console.log(User);
        if (!User) {
            res.status(404).json({ error: "User Not Found" });
            return;
        }
        res.json({ User: User });
    }
    catch (error) {
        res.status(500).json({ errorr: "Somtheing wrong" });
    }
});




router.delete("/:id", async (req, res) => {
    try {
        const User = await UserModel.findById(req.params.id);
        console.log(User);
        if (!User) {
            res.status(404).json({ error: "User Not Found" });
            return;
        }
        const result = await UserModel.deleteOne({ _id: req.params.id });
        res.status(204).json({ result: result.deletedCount });
    }
    catch (error) {
        res.status(500).json({ errorr: "Somtheing wrong" });
    }
});


async function addUser(req) {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const newUser = new UserModel(req.body);
    return newUser;
}

router.post("/", async (req, res) => {
    const newUser = await addUser(req);
    try {
        await newUser.save();
        await res.status(201).json({ user: newUser });
    } catch (e) {
        await res.status(400).json({ error: e.message })
    }
});

async function updateUserCashAndCredit(req, res) {

    try {
        // Find user by passport ID
        const { passportId, update, typeOfUpdate } = req.body;
        const user = await getUserByPassportId(req, res);

        // Check if update is positive
        if (update <= 0) {
            return res.status(400).json({ message: 'update must be a positive number' });
        }
        // Update user's update
        user[typeOfUpdate] = update;
        await user.save();

        res.json({ message: `Updated user ${user.name}'s update to ${update}` });
    } catch (err) {
        next(err);
    }
}

router.post("/updateCredit", async (req, res, next) => {
    updateUserCashAndCredit(req, res);
});

router.post("/updateCash", async (req, res) => {
    updateUserCashAndCredit(req, res);
});

async function getUserByPassportId(req, res) {
    // Find user by passport ID
    const { passportId, update } = req.body;
    const user = await UserModel.findOne({ passportId: passportId });
    if (!user) {
        res.status(404)
        throw new Error('User not found')
    }
    return user;
}

router.post("/WithdrawMoney", async (req, res) => {

    try {

        const { passportId, update, typeOfUpdate } = req.body;
        const user = await getUserByPassportId(req, res);
        // Check if user has enough funds in their wallet
        const totalFunds = user.cash + user.credit;
        if (update > totalFunds) {
            res.status(400)
            throw new Error('Not enough funds');
        }

        // Subtract amount from user's funds
        if (update <= user.cash) {
            user.cash -= update;
        } else {
            user.credit -= (update - user.cash);
            user.cash = 0;
        }
        await user.save();
        res.json({ message: `Withdrew ${update} from user ${user.eamil}'s wallet`, userCash: user.cash, userCredit: user.credit });
    } catch (err) {
        res.json({ message: `Somthing Error` });
    }
});

router.post("/Transfer", async (req, res) => {

    const { senderPassportId, receiverPassportId, amount } = req.body;

    try {
        // Find sender user by passport ID
        const sender = await UserModel.findOne({ passportId: senderPassportId });
        if (!sender) {
            res.status(404)
            throw new Error('Sender user not found')
        }

        // Find receiver user by passport ID
        const receiver = await UserModel.findOne({ passportId: receiverPassportId });
        if (!receiver) {
            res.status(404)
            throw new Error('reciver user not found')
        }

        // Check if sender has enough cash and credit to transfer
        if (amount > (sender.cash + sender.credit)) {
            res.status(400)
            throw new Error('Not enough funds');
        }

        // Deduct cash and credit from sender
        if (sender.cash >= amount) {
            sender.cash -= amount;
        } else {
            sender.credit -= (amount - sender.cash);
            sender.cash = 0;
        }
        await sender.save();

        // Add cash and credit to receiver
        receiver.cash += amount;
        await receiver.save();

        res.json({ message: `Transferred ${amount} from ${sender.email} to ${receiver.email}` });
    } catch (err) {
        res.json({ message: `Transferred feild` });

    }
})

router.post("/isLogin", (req, res) => {
    debugger
    console.log(res.cookie("token"));
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            res.send(JSON.stringify({ error: "Password is incorrect", status: 401 }))
            return;
        }

        const token = await jwt.createToken(user);

        if (token) {
            res.send(JSON.stringify({ user: user, token: token }));
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
});


module.exports = router;