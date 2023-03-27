import "./UpdateCode.css";
import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faCheck, faXmark, faMoneyBillTransfer, faRepeat } from "@fortawesome/free-solid-svg-icons";
function UpdateCode(params) {
    const [inputFlag, setInputFlag] = useState(false);
    const inputValue = useRef(null);
    const [error, setError] = useState("");

    function inputFlagHandler() {
        setInputFlag(!inputFlag);
        setError("")
        inputValue.current.value = ""
    }

    function updateInput(event) {
        debugger
        event.preventDefault();
        setError("")
        if (inputValue.current.value === "" || isNaN(inputValue.current.value)) {
            setError("please enter number");
            return
        }
        const url = 'http://localhost:3333/Users/' + params.update;
        console.log(url);
        fetch(url, {
            method: "POST",
            body: JSON.stringify({ update: inputValue.current.value, passportId: params.user.passportId,typeOfUpdate:params.type }),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(data => { setError(data.message); inputFlagHandler(); window.location.reload() });

    }
    return (<>
        <div className="d-flexUpdate">
            <h2>{params.type+": "}{params.user[params.type]}</h2>
            <button onClick={inputFlagHandler}><FontAwesomeIcon className={`iconFont`} icon={params.icon} /></button>
        </div>
        <div className="d-flexUpdate">
            <input ref={inputValue} className={inputFlag ? "" : "d-visibility"} type="text" />
            <FontAwesomeIcon onClick={updateInput} className={`checkIconFont ${inputFlag ? "" : "d-visibility"}`} icon={faCheck} />
            <FontAwesomeIcon onClick={inputFlagHandler} className={`removeIconFont ${inputFlag ? "" : "d-visibility"}`} icon={faXmark} />
        </div>
    </>)
}

export { UpdateCode }