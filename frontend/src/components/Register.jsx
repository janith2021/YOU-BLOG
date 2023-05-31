import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Toast } from './Toast'


function Register() {
  const navigate = useNavigate()
  const [input,setInput] = useState({
    name : "",
    email : "" ,
    password : "" ,
    phone : "",
    address : "",
  })
  const handlingchanges = (e)=>{
    setInput((previousState) => ({
      ...previousState,
      [e.target.name] : e.target.value
    }))
  }
  const registerUser = async () => {
    const res = await axios.post("http://localhost:5000/api/user/",{
      name : input.name,
      email : input.email,
      password : input.password,
      address : input.address,
      phone : input.phone
    }).catch(error => console.log(error))
    const data = await res.data
    data.message 
    ? (
      await Toast.fire({
        icon : data.type,
        title : data.message
      })
    )
    : console.log(data)
    return data
  }
  const handlingSubmit = (e) => {
    e.preventDefault()
    registerUser().then((data)=>{
      if(data.type === 'success'){
        navigate('/login')
      }
    })
    console.log(input)
  }
  return (
    <div class="container" style={{width: "50vw" , backgroundColor: "#f368e0" , borderRadius: "10px" , boxShadow: "5px 15px" , marginTop: "100px"}}>
      <div class="row text-center p-4" style={{minHeight : "15px"}}>
        <h1 style={{fontFamily: "'Kanit', sans-serif" , color: "#130f40" ,}}>YOU BLOG Register</h1>
      </div>
      <div class="row p-4">
        <form onSubmit={handlingSubmit}>
          <div class="row">
            <div class="mb-3 col-sm-12 col-lg-6">
              <label for="exampleInputEmail1" class="form-label" style={{fontSize : "15pt" , fontWeight: "bolder"}}>Name</label>
              <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={input.name} name='name' onChange={handlingchanges} required/>
            </div>
            <div class="mb-3 col-sm-12 col-lg-6">
              <label for="exampleInputEmail1" class="form-label" style={{fontSize : "15pt" , fontWeight: "bolder"}}>Email Address</label>
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={input.email} name='email' onChange={handlingchanges} required/>
            </div>
          </div>
          <div class="row">
            <div class="mb-3 col-sm-12 col-lg-6">
              <label for="exampleInputEmail1" class="form-label" style={{fontSize : "15pt" , fontWeight: "bolder"}}>Mobile Number</label>
              <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={input.phone} onChange={handlingchanges} name='phone' required/>
            </div>
            <div class="mb-3 col-sm-12 col-lg-6">
              <label for="exampleInputEmail1" class="form-label" style={{fontSize : "15pt" , fontWeight: "bolder"}}>Address</label>
              <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='address' onChange={handlingchanges} value={input.address} required/>
            </div>
          </div>
          <div class="row">
            <div class="mb-3 col-sm-12 col-lg-6">
              <label for="exampleInputEmail1" class="form-label" style={{fontSize : "15pt" , fontWeight: "bolder"}}>Password</label>
              <input type="password" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handlingchanges} name='password' value={input.password} required/>
            </div>
            <div class="mb-3 col-sm-12 col-lg-6">
              <label for="exampleInputEmail1" class="form-label" style={{fontSize : "15pt" , fontWeight: "bolder"}}>Confirm Password</label>
              <input type="password" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required/>
            </div>
          </div>
          
          <button type="submit" class="btn btn-success w-100  mb-2 p-2">Register</button>
          <label style={{fontSize : "15pt" , fontWeight: "bolder"}}>Already Have an Account?</label>
          <Link to="/login"><button type="submit" class="btn btn-primary w-100 mt-3 p-2">Login</button></Link>
      </form>
    </div>
  </div>
  )
}

export default Register