const jwt = require('jsonwebtoken');
require('dotenv').config();

function createToken(user) {
    const token = jwt.sign({ id: user.id, type: user.type }, process.env.SECRET, { expiresIn: '1h' })
    console.log("token", token);
    return token;
}

function Verify(token) {
    const verfiy = jwt.verify(token, process.env.SECRET)
    console.log("verfiy", verfiy);
    return verfiy;
}

module.exports = { createToken ,Verify}