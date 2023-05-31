import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import { authenticationActions } from '../store'
import { Toast } from './Toast'


function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let loginfail = 0;
  const [remember,setRemember] = useState()
 
  const remembermeHandler = ()=>{
    const emailing = input.email.trim()
    const passwords = input.password.trim()
    console.log('hello')
    if(remember){
      localStorage.removeItem('userName')
      localStorage.removeItem('password')
      setRemember(false)
    }
    else if(!remember && (emailing != '' && passwords != '')){
      localStorage.setItem('userName',input.email)
      localStorage.setItem('password',input.password)
      setRemember(true)
    }
    else{
      Toast.fire({
        icon : 'warning',
        title : 'Please Enter Login Credentials and then Click Remember Me Check Box',
        timer : 5000

      })
    }
  }
  
  
 
  useEffect(()=>{
    
    if(localStorage.getItem('userName') && localStorage.getItem('password')){     
      setRemember(true)
    }else{      
      setRemember(false)
    }
  },[])
 
  const[input,setInput] = useState({
    email : localStorage.getItem('userName') ? localStorage.getItem('userName') : '',
    password : localStorage.getItem('password') ? localStorage.getItem('password') : '',
  })
  
  const inputHandler = (e) => {
    setInput((previousState)=> ({
      ...previousState,
       [e.target.name] : e.target.value
      
    }))
  }
  const loginUser = async () =>{
    const res = await axios.post("http://localhost:5000/api/user/login",{
      email : input.email,
      password : input.password
    }).catch(err => console.log(err))
    const data = await res.data
    console.log(data)
    {
      data.message && data.type 
      ?  Toast.fire ({
        icon : data.type,
        title : data.message,
        timer : 3000
      })
      : <></>
    }
    // if(!data.users){
    //  loginfail = 1
    //  console.log(loginfail)
    // }
    // if(!data.users){
    //   loginfail = 1;
    // }
    // console.log(data.users._id)
    return data
  }
  const submitHandler = (e)=>{
    e.preventDefault()
    
    // loginUser().then((data) => localStorage.setItem("userID",data.users._id)).then(()=>dispatch(authenticationActions.login())).then(()=> navigate("/"))
    loginUser().then(
      (data) => {
        if(data.users){
          localStorage.setItem("userID",data.users._id)
          dispatch(authenticationActions.login())
          navigate('/')
        }
      }
    )
    
    console.log(input)
  }
  return ( 
    <div class="container" style={{width: "50vw" , backgroundColor: "#f368e0" , borderRadius: "10px" , boxShadow: "5px 15px" , marginTop: "100px"}}>
      <div class="row text-center p-4" style={{minHeight : "15px"}}>
        <h1 style={{fontFamily: "'Kanit', sans-serif" , color: "#130f40" ,}}>YOU BLOG LOGIN</h1>
      </div>
      <div class="row p-5">
        <form onSubmit={submitHandler}>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label" style={{fontSize : "15pt" , fontWeight: "bolder"}}>Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={input.email} name='email' onChange={inputHandler} required/>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label" style={{fontSize : "15pt" , fontWeight: "bolder"}}>Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" value={input.password} name='password' onChange={inputHandler} required/>
          </div>
          <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1" checked={remember} onChange={remembermeHandler}/>
            <label class="form-check-label" for="exampleCheck1" >Remember Me</label>
          </div>
          <button type="submit" class="btn btn-primary w-100 mb-2 p-2">Login</button>
          <Link to="/reset"><button  class="btn btn-warning w-100 mb-2 p-2">Forgot Password</button></Link>
          <label style={{fontSize : "15pt" , fontWeight: "bolder"}}>Don't have an Account?</label>
          <Link to="/register"><button type="submit" class="btn btn-success w-100 mt-3 p-2">Register</button></Link>
      </form>
    </div>
  </div>
  )
}

export default Login