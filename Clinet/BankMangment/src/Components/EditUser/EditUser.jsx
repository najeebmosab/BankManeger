import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "./EditUser.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faCheck, faXmark, faMoneyBillTransfer, faRepeat } from "@fortawesome/free-solid-svg-icons";

function EditUser() {
    const location = useLocation();
    const [user, setUser] = useState({});
    const [inputFlagCash, setInputFlagCash] = useState(false);
    const [inputFlagCredit, setInputFlagCredit] = useState(false);
    const inputCash = useRef(null);
    const inputCredit = useRef(null);
    const [error, setError] = useState("");

    const [inputFlagWithdrawMoney, setInputFlagWithdrawMoney] = useState(false);
    const inputWithdrawMoney = useRef(null);

    const [inputFlagTransfer, setInputFlagTransfer] = useState(false);
    const inputTransfer = useRef(null);
    const inputTransferPassportId = useRef(null);

    useEffect(() => {
        console.log("id", location.state);

        fetch(`http://localhost:3333/Users/${location.state}`).then(res => res.json()).then(data => setUser(data.User));
    }, []);


    function inputFlagWithdrawMoneyHandler() {
        setInputFlagWithdrawMoney(!inputFlagWithdrawMoney);
        setError("")
        inputWithdrawMoney.current.value = ""
    }

    function inputFlagCreditHandler() {
        console.log(inputFlagCredit);
        setInputFlagCredit(!inputFlagCredit);
        setError("")
        inputCredit.current.value = ""
    }

    function inputFlagCashHandler() {
        console.log(inputFlagCash);
        setInputFlagCash(!inputFlagCash);
        setError("")
        inputCash.current.value = "";
    }

    function updateCredit(event) {
        event.preventDefault();
        setError("")
        if (inputCredit.current.value === "" || isNaN(inputCredit.current.value)) {
            setError("please enter number");
            return
        }
        fetch("http://localhost:3333/Users/updateCredit", {
            method: "POST",
            body: JSON.stringify({ credit: inputCredit.current.value, passportId: user.passportId }),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(data => { setError(data.message); inputFlagCreditHandler(); window.location.reload() });
    }

    function updateCash(event) {
        event.preventDefault();
        setError("")
        if (inputCash.current.value === "" || isNaN(inputCash.current.value)) {
            setError("please enter number");
            return
        }

        fetch("http://localhost:3333/Users/updateCash", {
            method: "POST",
            body: JSON.stringify({ cash: inputCash.current.value, passportId: user.passportId }),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(data => { setError(data.message); inputFlagCashHandler(); window.location.reload() });

    }

    function updateWithdrawMoney(event) {
        event.preventDefault();
        setError("")
        if (inputWithdrawMoney.current.value === "" || isNaN(inputWithdrawMoney.current.value)) {
            setError("please enter number");
            return
        }
        fetch("http://localhost:3333/Users/WithdrawMoney", {
            method: "POST",
            body: JSON.stringify({ amount: inputWithdrawMoney.current.value, passportId: user.passportId }),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(data => { setError(data.message); inputFlagWithdrawMoneyHandler(); window.location.reload() });

    }

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
            body: JSON.stringify({ amount: inputTransfer.current.value, senderPassportId: user.passportId,receiverPassportId: inputTransferPassportId.current.value}),
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
                        <div className="d-flexUpdate">
                            <h2>cash: {user.cash}</h2>
                            <button onClick={inputFlagCashHandler}><FontAwesomeIcon className="iconFont" icon={faGear} /></button>
                        </div>
                        <div className="d-flexUpdate">
                            <input ref={inputCash} className={inputFlagCash ? "" : "d-visibility"} type="text" />
                            <FontAwesomeIcon onClick={updateCash} className={`checkIconFont ${inputFlagCash ? "" : "d-visibility"}`} icon={faCheck} />
                            <FontAwesomeIcon onClick={inputFlagCashHandler} className={`removeIconFont ${inputFlagCash ? "" : "d-visibility"}`} icon={faXmark} />
                        </div>
                    </section>
                    <section>
                        <div className="d-flexUpdate">
                            <h2>credit: {user.credit}</h2>
                            <button onClick={inputFlagCreditHandler}><FontAwesomeIcon className={`iconFont`} icon={faGear} /></button>
                        </div>
                        <div className="d-flexUpdate">
                            <input ref={inputCredit} className={inputFlagCredit ? "" : "d-visibility"} type="text" />
                            <FontAwesomeIcon onClick={updateCredit} className={`checkIconFont ${inputFlagCredit ? "" : "d-visibility"}`} icon={faCheck} />
                            <FontAwesomeIcon onClick={inputFlagCreditHandler} className={`removeIconFont ${inputFlagCredit ? "" : "d-visibility"}`} icon={faXmark} />
                        </div>
                    </section>
                </div>
                <div className="WithdrawAndTransferring">
                    <section>
                        <button onClick={inputFlagWithdrawMoneyHandler}><FontAwesomeIcon className={`iconFont`} icon={faMoneyBillTransfer} /></button>
                        <div className="d-flexUpdate">
                            <input ref={inputWithdrawMoney} className={inputFlagWithdrawMoney ? "" : "d-visibility"} type="text" />
                            <FontAwesomeIcon onClick={updateWithdrawMoney} className={`checkIconFont ${inputFlagWithdrawMoney ? "" : "d-visibility"}`} icon={faCheck} />
                            <FontAwesomeIcon onClick={inputFlagWithdrawMoneyHandler} className={`removeIconFont ${inputFlagWithdrawMoney ? "" : "d-visibility"}`} icon={faXmark} />
                        </div>

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