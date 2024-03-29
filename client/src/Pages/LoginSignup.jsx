import React, { useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import './css/LoginSignup.css'

export const LoginSignup = (props) => {
  const APISIGNUP = 'http://localhost:4000/signup'
  const APILOGIN = 'http://localhost:4000/login'
  const [state, setState] = useState('Login');
  const [formData, setFormData] = useState({
    username:"",
    password:"",
    email:""
  });


  useEffect(() => {
    if (!props.isLogin){
      setState('Sign Up');
    } else {
      setState('Login')
    }
  }, [props.isLogin]);

  const changeHandler = async(e) =>{
    setFormData({...formData,[e.target.name]:e.target.value});
  };

  const login = async()=>{
    console.log("Login Function Executed", formData);
    let responseData;
    await fetch(APILOGIN, {
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then((resp)=> {
      return resp.json();
    })
    .then((data)=>{
      if(!data.token){
        alert("Wrong password");
        return
      }
      localStorage.setItem('auth-token', data.token);
      // localStorage.setItem('userId', data.userId);
      console.log(data);
      window.location.replace("/");
    })
    .catch((err)=>{
      console.log(err);
    })
  };

  const signup = async()=>{
    console.log("Signup Function Executed", formData);
    let responseData;
    await fetch(APISIGNUP, {
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then((resp)=> {
      alert("SUCCESS");
      return resp.json();
    })
    .then((data)=>{
      console.log(data);
      window.location.replace("/login")
    })
    .catch((err)=>{
      console.log(err);
    });

    // if(responseData.success){
    //   localStorage.setItem('auth-token', responseData.token);
    //   window.location.replace("/");
    // } else{
    //   alert(responseData.errors);
    // }
};

  return (
    <div className='loginsignup'>
      <div className='loginsignup-container'>
        <h1>{state}</h1>
        <div className='loginsignup-fields'>
          {state === "Sign Up"?<input name='username' value={formData.username} onChange={changeHandler} type='text' placeholder='Your Name' />:<></>}
          <input name='email' value={formData.email} onChange={changeHandler} type='email' placeholder='Email Address' />
          <input name='password' value={formData.password} onChange={changeHandler} type='password' placeholder='Password' />
        </div>
        <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
        {state === "Sign Up"?
          <p className='loginsignup-login'>Already have an account? <Link to='/login' style={{textDecoration:'none'}}><span onClick={()=>{setState('Login')}}>Login here</span></Link></p>:
          <p className='loginsignup-login'>Create an account? <Link to='/signup' style={{textDecoration:'none'}}><span onClick={()=>{setState('Sign Up')}}>Click here</span></Link></p>
        }
      </div>
    </div>
  )
}
