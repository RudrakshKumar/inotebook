import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import inote from "./inote.png"


const Login = (props) => {

    const host = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "" })

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleLogin = async (e) => {

        e.preventDefault();

        try {
            const response = await fetch(`${host}/api/auth/login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password })
            });
            const json = await response.json();
            if (json.success) {
                localStorage.setItem('token', json.authtoken)
                props.showAlert('Logged In Succesfully', 'success')
                navigate("/home")
            }
            else {
                props.showAlert(`${json.error}`, 'danger')
            }
        } catch (e) {
            props.showAlert('Some error Occurred', 'danger')
        }
    }

    return (
        <div >
            <div style={{ display: "flex" }}>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",marginTop:"40px" }}>

                    <h1 style={{ fontFamily: "fantasy", fontSize: "70px" }}><img src={inote} alt="" width="100px" height="100px" style={{ marginBottom: "10px" }} /> iNoteBook</h1>
                    <div style={{ fontSize: "30px", marginLeft: "40px" }}>
                        <p>"Helps you capture your thoughts and ideas effortlessly."</p>
                    </div>
                </div>


                <div className="loginForm" >
                    <div className="loginBox">
                        <form onSubmit={handleLogin}>
                            <div className="mb-3">
                                <input type="email" className="loginInput form-control" id="email" name="email" placeholder="Email address" aria-describedby="emailHelp" onChange={handleChange}  />
                            </div>
                            <div className="mb-3">
                                <input type="password" className="loginInput form-control" id="password" name="password" placeholder="Password" onChange={handleChange} minLength={5} required  />
                            </div>
                            <button type="submit" className="btn btn-primary my-2" style={{ width: "90%", height: "60px", fontSize: "30px" }}><h2>Log in</h2></button>

                            <hr style={{ border: '1px solid white' }}/>
                            <Link role="button" type="button" to="/signup" className=" create btn my-2" style={{ width: "50%", height: "60px", backgroundColor: "#42b72a", color: "white", paddingTop: "12px" }}><h4>Create new account</h4></Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
