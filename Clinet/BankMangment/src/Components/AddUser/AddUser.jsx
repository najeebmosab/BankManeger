import { useRef } from "react";
import { useNavigate } from "react-router-dom"
import "./AddUser.css";
function AddUser() {
    const email = useRef(null);
    const password = useRef(null);
    const userType = useRef(null);
    const passportId = useRef(null);
    const navigate = useNavigate();
    const error = useRef(null);
    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    function addHandler(event) {
        event.preventDefault();

        if (email.current.value === "" || password.current.value === "" || passportId.current.value === "") {
            return;
        }
        const isVal = isValidEmail(email.current.value);

        if (isVal) {
            const addUser = {
                email: email.current.value,
                password: password.current.value,
                typeUser: userType.current.value,
                passportId:passportId.current.value
            }
            error.current.innerText = "";

            fetch("http://localhost:3333/Users/", {
                method: "POST",
                body: JSON.stringify(addUser),
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json()).then(data => {
                if (data?.error) {
                    error.current.innerText = data.error;
                }
                else {
                    navigate("/HomePage");
                }
                console.log(data)
            });
        }
    }

    return (
        <>
            <div className="errorHandler" >
                <p ref={error}></p>
            </div>
            <form action="" className="addNewUser" onSubmit={addHandler}>
                <div>
                    <label htmlFor="">Email</label>
                    <input ref={email} type="email" />
                </div>
                <div>
                    <label htmlFor="">Password</label>
                    <input ref={password} type="Password" />
                </div>
                <div>
                    <label htmlFor="">User Type</label>
                    <input ref={userType} type="text" />
                </div>
                <div>
                    <label htmlFor="">passportId</label>
                    <input ref={passportId} type="text" />
                </div>
                <div className="btnDiv">
                    <button type="submit">Add User</button>
                </div>
            </form>
        </>)
}

export { AddUser }