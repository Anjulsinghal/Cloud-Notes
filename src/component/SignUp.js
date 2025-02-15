import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom';

const SignUp = (props) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: ""});
  let navigate = useNavigate();
  const handelSubmit = async (e)=>{
      e.preventDefault();
      const {name, email, password, cpassword} = credentials;
      
      if (password !== cpassword) {
        props.showAlert("Password does not match", "danger");
      }
      else{
        const response = await fetch(`${apiUrl}/api/auth/createuser`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password})
          });
          const json = await response.json();
          console.log(json);
          if (json.success) {
            //Save the auth token and redirect
            localStorage.setItem('token', json.authToken);
            navigate("/");
            props.showAlert(`${name} : Your account created Successfully `, "success");
          }
          else{
            props.showAlert(json.error, "danger");
          }

      }
  }
  const onChange = (e)=>{
      setCredentials({...credentials, [e.target.name]: e.target.value })
  }
  return (
    <>
    <div className="loginpage">
      <form className='loginform signform'  onSubmit={handelSubmit}>
        <h2>Sign-Up to Cloud-Notes</h2>
        <div className="form">
        <div className="f1 form-group">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" placeholder="Enter Name" onChange={onChange} required/>
        </div>
        <div className="f1 form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange} required/>
          <div id="emailHelp" className="small">We'll never share your email with anyone else.</div>
        </div>
        <div className="f1 form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" name='password' placeholder="Password" onChange={onChange} minLength={5} required/>
        </div>
        <div className="f1 form-group">
          <label htmlFor="cpassword">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name='cpassword' placeholder="Confirm Password" onChange={onChange} minLength={5} required/>
        </div>
        </div>
        <div className="logbotton">
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link className="btn btn-outline-primary mx-4"  to="/login" role="button">Login</Link>                    

        </div>
      </form>

</div>

    </>
  )
}

export default SignUp
