import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'


export function Reset() {
    const navigate = useNavigate()
   const[input,setemail] = useState()
   const inputHandler = (e) => {
    setemail(()=>({
        [e.target.name] : e.target.value
    }))
   }
   const ResetPassword = async () => {
    console.log(input)
    const res1 = await axios.post('http://localhost:5000/api/user/reset',{
        email : input.email
    })
    const data1 = await res1.data
    console.log(data1)
    if(data1.type === 'error'){
        Swal.fire({
            icon: 'error',
            title: 'No User Found',
            text: 'Invalid Email',
          })
    }
    
    if(data1.otp){
        const OTP = data1.otp
        const mobile = Number(data1.phone) 
        const id = data1.id;
        localStorage.setItem('resetuser',id)
        const message = 'Hello '+data1.name+','+'\n Your OTP for Reset Password is \n'+OTP+'\n Thank You \n'+'YOU BLOG' 
        alert(message)
        const res2 = await axios.post(`https://app.notify.lk/api/v1/send?user_id=23978&api_key=AFEGBWbhZsgNCbGGtxBi&sender_id=NotifyDEMO&to=${mobile}&message=${message}`)
        const data2 = await res2.data
        // console.log(data2.status)
        if(data2.status === 'success'){
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'OTP SENT TO YOUR MOBILE NUMBER',
                showConfirmButton: false,
                timer: 1500
              })

        }
        
    }
    return data1
   }
   const submitHandler = (e) => {
    e.preventDefault()
    ResetPassword().then((data)=>{
        if(data.type === 'success'){
            navigate('/verify')
        }
    })
   }
  return (
    <div>
    <div class='container bg-white p-5' style={{marginTop:"40vh" , width:"100vh" , borderRadius:"10px"}}>
    <form onSubmit={submitHandler}>
        <h1 style={{color:"red" , textAlign: "center"}}>Reset Password</h1>
        <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control mt-2" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Your Account email" name='email' onChange={inputHandler} required/>
        </div>
        <div style={{textAlign: 'center'}}>
        <button type="submit" class="btn btn-primary mt-2">Submit</button>
        </div>
    </form>
    </div>
    </div>
  )
}

export default Reset