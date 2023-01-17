import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {

    const [credentials, setCredentials] = useState({name:"", email: "", password: "", cpassword:""});
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const {name, email, password} = credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
               // 'auth-token' : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM4YWQ5NjE3MWJhNTJjNTYxMmQ3YjU4In0sImlhdCI6MTY3MTAxMDU0OX0.k30sopbkrHyKB6aeAuYihwZqa6gd4ca4qHlYDlWvTKo",
                
            },
            body: JSON.stringify({name, email, password}) 
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            //save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            navigate("/");
            props.showAlert("Account Created Successfully", "success");

        }else{
           // alert("Invalid Credentials");
           props.showAlert("Invalid Credentials", "danger");
        }

    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    
    }




  return (
    <div className='container mt-3'>
        <h2>SignUp to continue to INotebook</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Name: </label>
            <input type="text" className="form-control" id="name" aria-describedby="nameHelp" name="name" onChange={onChange}/>
            
        </div>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email: </label>
            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" onChange={onChange}/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password: </label>
            <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required/>
        </div>
        <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password: </label>
            <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      
    </div>
  )
}

export default Signup
