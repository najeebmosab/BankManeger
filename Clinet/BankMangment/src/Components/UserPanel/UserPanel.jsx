import "./UserPanel.css";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

function UserPanel() {
    const [Users, setUsers] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        fetch("http://localhost:3333/Users/", {
            method: "GET",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(data => { setUsers(data.Users) });
    }, []);

    function controllerHandler(id) {
        navigate("EditUser",{state:id});
    }

    console.log(Users);
    return (<>
        <div className="panelContainer">
            <div className="addUser">
                <Link to="AddUser">Add User</Link>
            </div>

            <table>
                <thead>
                    <th>email</th>
                    <th>credit</th>
                    <th>cash</th>
                    <th>passportId</th>
                    <th>type user</th>
                    <th>Controller</th>
                </thead>
                <tbody>
                    {
                        Users?.map((user) => {
                            return (
                                <>
                                    {

                                        <tr key={user?._id}>
                                            <td>{user?.email}</td>
                                            <td>{user?.credit}</td>
                                            <td>{user?.cash}</td>
                                            <td>{user?.passportId}</td>
                                            <td>{user?.typeUser}</td>
                                            <td>
                                                <button onClick={() => {

                                                    controllerHandler(user?._id)
                                                }}>
                                                    <FontAwesomeIcon className="iconFont" icon={faGear} />
                                                </button>
                                            </td>
                                        </tr>

                                    }
                                </>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    </>)
}

export { UserPanel }