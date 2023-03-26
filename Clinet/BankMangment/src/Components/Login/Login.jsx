import "./Login.css";
import { Link } from 'react-router-dom';
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom"
function Login() {
    const navigate = useNavigate();
    const email = useRef(null);
    const password = useRef(null);
    const error = useRef(null);
    const [user, setUser] = useState({});

    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }


    function loginHandler(event) {
        event.preventDefault();

        if (email.current.value === "" || password.current.value === "") {
            error.current.innerText = "validation Filed";
            return;
        }
        else {
            error.current.innerText = "";
        }
        const isVal = isValidEmail(email.current.value);

        if (isVal && password.current.value !== "") {
            const login = {
                email: email.current.value,
                password: password.current.value
            }
            fetch("http://localhost:3333/Users/login", {
                method: "POST",
                body: JSON.stringify(login),
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json()).then(data => {
                console.log("data", data);
                if (data?.error) {
                    error.current.innerText = data?.error;
                }
                else {
                    localStorage.setItem("user",JSON.stringify(data.user));
                    localStorage.setItem("token",JSON.stringify(data.token));
                    navigate('/HomePage', { replace: true });
                }
            });

        }
    }

    return (
        <>
            <div className="loginContainer">
                <form className="loginForm" onSubmit={loginHandler}>

                    <h3>Login Page</h3>
                    <div ref={error} className="errorHandler">
                    </div>
                    <label htmlFor="">Email</label>
                    <input type="email" ref={email} placeholder="Email" />

                    <label htmlFor="">Password</label>
                    <input type="password" ref={password} placeholder="Password" />
                    <button type="submit" className="loginBTN">
                        Login
                    </button>
                    <div className="linkSingup">
                        <Link>Singup</Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export { Login }