import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = (props) => {
  axios.defaults.withCredentials = true;

  const host = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (credentials.password !== credentials.cpassword) {
      props.showAlert('Please confirm the correct password', 'danger');
    } else {
      try {
        const response = await axios.post(
          `${host}/api/auth/createuser`,
          {
            name: credentials.name,
            email: credentials.email,
            password: credentials.password,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.data.success) {
          localStorage.setItem('token', response.data.authtoken);
          navigate("/home");
          props.showAlert('Signed In Successfully', 'success');
        } else {
          props.showAlert(`${response.data.error}`, 'danger');
        }
      } catch (e) {
        props.showAlert('Some error occurred', 'danger');
      }
    }
  };

  return (
    <div className='loginForm'>
      <div className="loginBox" style={{ width: "550px", height: "500px" }}>
        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <input type="text" className="loginInput form-control" id="name" name="name" placeholder='Name' onChange={handleChange} minLength={3} required />
          </div>
          <div className="mb-3">
            <input type="email" className="loginInput form-control" id="email" name="email" placeholder='Email address' aria-describedby="emailHelp" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <input type="password" className="loginInput form-control" id="password" name="password" placeholder='Password' onChange={handleChange} minLength={5} required />
          </div>
          <div className="mb-3">
            <input type="password" className="loginInput form-control" id="cpassword" name="cpassword" placeholder='Confirm Password' onChange={handleChange} minLength={5} required />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: "90%", height: "60px", fontSize: "30px", marginTop: "20px" }}>Sign up</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
