import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "./EditUser.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faCheck, faXmark, faMoneyBillTransfer, faRepeat } from "@fortawesome/free-solid-svg-icons";
import { UpdateCode } from "../UpdateCode/UpdateCode";

function EditUser() {
    const location = useLocation();
    const [user, setUser] = useState({});
    const [error, setError] = useState("");
    const [inputFlagTransfer, setInputFlagTransfer] = useState(false);
    const inputTransfer = useRef(null);
    const inputTransferPassportId = useRef(null);

    useEffect(() => {
        console.log("id", location.state);

        fetch(`http://localhost:3333/Users/${location.state}`).then(res => res.json()).then(data => setUser(data.User));
    }, []);

    function inputTransferHandler() {
        setInputFlagTransfer(!inputFlagTransfer);
        setError("")
        inputTransfer.current.value = ""
    }

    function updateTransfer(event) {
        event.preventDefault();
        setError("")
        if (inputTransfer.current.value === "" || isNaN(inputTransfer.current.value) || inputTransferPassportId.current.value === "") {
            setError("please enter number");
            return
        }
        fetch("http://localhost:3333/Users/Transfer", {
            method: "POST",
            body: JSON.stringify({ amount: inputTransfer.current.value, senderPassportId: user.passportId, receiverPassportId: inputTransferPassportId.current.value }),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(data => { setError(data.message); inputTransferHandler(); window.location.reload() });

    }

    console.log(user);
    return (<>
        <div className="userController">
            <h2 className="text-centerHrader">
                {error}
            </h2>
            <div className="userCard">
                <div className="text-centerHrader">
                    <h2>{user.email}</h2>
                </div>
                <div className="sectionEdit">
                    <section>
                        <UpdateCode user={user} update={"updateCash"} type={"cash"} icon={faGear}></UpdateCode>
                    </section>
                    <section>
                        <UpdateCode user={user} update={"updateCredit"} type={"credit"} icon={faGear}></UpdateCode>
                    </section>
                </div>
                <div className="WithdrawAndTransferring">
                    <section>
                        <UpdateCode user={user} update={"WithdrawMoney"} type={""} icon={faMoneyBillTransfer}></UpdateCode>
                    </section>
                    <section>
                        <button onClick={inputTransferHandler} className="primary"><FontAwesomeIcon className={`iconFont`} icon={faRepeat} /></button>
                        <div className="d-flexUpdate">
                            <div className="transfer">
                                <input type="text" ref={inputTransfer} placeholder="amount" className={inputFlagTransfer ? "" : "d-visibility"} />
                                <input type="text" ref={inputTransferPassportId} placeholder="Passport Id" className={inputFlagTransfer ? "" : "d-visibility"} />
                            </div>
                            <FontAwesomeIcon onClick={updateTransfer} className={`checkIconFont ${inputFlagTransfer ? "" : "d-visibility"}`} icon={faCheck} />
                            <FontAwesomeIcon onClick={inputTransferHandler} className={`removeIconFont ${inputFlagTransfer ? "" : "d-visibility"}`} icon={faXmark} />
                        </div>
                    </section>
                </div>
                <div className="text-centerHrader">
                    <h2>Type User: {user.typeUser}</h2>
                </div>
            </div>



        </div>
    </>)
}

// ("asdasd",()=>{
//     expect(3+2).tobe(5)
// })

export { EditUser }