import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

function Verification() {
    const [otp,SetOTP] = useState()
    const navigate = useNavigate()
    const inputHandler = (e) => {
        SetOTP(()=>({
            [e.target.name] : e.target.value
        })) 
    }
    const verification = async ()=>{
        const res = await axios.post('http://localhost:5000/api/user/verify',{
            OTP : otp.OTP
        })
        const data = res.data
        return data
    }
    const submitHandler = (e) => {
        e.preventDefault()
        verification().then((data)=>{
            if(data.type === 'success'){
                Swal.fire(
                    'OTP VERIFIED!',
                    'You have Successfully verified your OTP',
                    'success'
                  )
                navigate('/resetting')    
            }else{
                Swal.fire(
                    'Invalid OTP!',
                    'Please Enter the Valid OTP',
                    'error'
                  )
            }
        })
    }
  return (
    <div class='container bg-white p-5' style={{marginTop:"40vh" , width:"100vh" , borderRadius:"10px"}}>
    <form onSubmit={submitHandler}>
        <h1 style={{color:"red" , textAlign: "center"}}>Verify OTP</h1>
        <div class="form-group">
            <label for="exampleInputEmail1">Enter OTP</label>
            <input type="text" class="form-control mt-2" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Your OTP" name='OTP'onChange={inputHandler} required/>
        </div>
        <div style={{textAlign: 'center'}}>
        <button type="submit" class="btn btn-primary mt-2">Verify</button>
        </div>
    </form>
    </div>
  )
}

export default Verification