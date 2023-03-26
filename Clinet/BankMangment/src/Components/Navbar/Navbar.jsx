import "./Navbar.css";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState({});
    useEffect(() => {
        if (!localStorage.getItem("token") && !localStorage.getItem("user")) {
            navigate("/");
        }

    }, []);
    function logoutHandler() {
        Cookies.remove('token');
        navigate("/");
    }


    return (
        <>
            <nav>
                <section>
                    <Link to="/HomePage" className="logo">Bank Mangement</Link>
                </section>
                <section>
                    <ul>
                        <li><a onClick={logoutHandler}><FontAwesomeIcon icon={faRightFromBracket} /></a></li>
                    </ul>
                </section>
            </nav>
            <Outlet></Outlet>
        </>
    )
}


export { Navbar };