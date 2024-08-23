import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = (props) => {
  axios.defaults.withCredentials=true;

  const host = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleSignup = async (e) => {
    e.preventDefault();

    if (credentials.password !== credentials.cpassword) {
      props.showAlert(`Please comfirm the correct password`, 'danger')
    }

    else {
      try {
        const response = await axios.post(`${host}/api/auth/createuser`, {
          
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        if (json.success) {
          localStorage.setItem('token', json.authtoken)
          navigate("/home")
          props.showAlert('Signed In Succesfully', 'success')
        }
        else {
          props.showAlert(`${json.error}`, 'danger')
        }
      } catch (e) {
        props.showAlert('Some error occured', 'danger')
      }
    }
  }


  return (
    <div className='loginForm' >
      <div className="loginBox" style={{ width: "550px", height: "500px" }}>
        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <input type="text" className="loginInput form-control" id="name" name="name" placeholder='Name' onChange={handleChange} minLength={3} required />
          </div>
          <div className="mb-3">
            <input type="email" className="loginInput form-control" id="email" name="email" placeholder='Email address' aria-describedby="emailHelp" onChange={handleChange} />
          </div>
          <div className="mb-3">
            <input type="password" className="loginInput form-control" id="password" name="password" placeholder='Password' onChange={handleChange}  minLength={5} required />
          </div>
          <div className="mb-3">
            <input type="password" className="loginInput form-control" id="cpassword" name="cpassword" placeholder='Comfirm Password' onChange={handleChange}  minLength={5} required />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: "90%", height: "60px", fontSize: "30px", marginTop: "20px" }}>Sign up</button>
        </form>
      </div>
    </div>
  )
}

export default Signup
