import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
function Resetting() {
    const navigate = useNavigate()
    const[passwords,setPasswords] = useState()
    const inputHandler = (e) => {
        setPasswords(()=>({
            [e.target.name] : e.target.value
        }))
    }
    
    const resetting = async () => {
        const res = await axios.post("http://localhost:5000/api/user/resetpassword",{
            password : passwords.password,
            user : localStorage.getItem('resetuser')
        })
        const data = await res.data
        return data
    }
    const submitHandler = (e) => {
        e.preventDefault()
        resetting().then((data)=>{
            if(data.type === 'success'){
                Swal.fire(
                    'Your Password Updated Successfully!',
                    'Now You can Login from Your New Password',
                    'success'
                  )
                navigate('/login')    
            }
            else{
                Swal.fire(
                    'There is an error on Password Update!',
                    'Please Try Again Later',
                    'error'
                  )
            }
        })
    }
    
  return (
    <div class='container bg-white p-5' style={{marginTop:"40vh" , width:"100vh" , borderRadius:"10px"}}>
    <form onSubmit={submitHandler}>
        <h1 style={{color:"red" , textAlign: "center"}}>Reset Password</h1>
        <div class="form-group">
            <label for="exampleInputEmail1">Enter Your New Password</label>
            <input type="password" class="form-control mt-2" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Your New Password" name='password'onChange={inputHandler} required/>
            <input type="password" class="form-control mt-2" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Your Confirm Password" required/>
        </div>
        <div style={{textAlign: 'center'}}>
        <button type="submit" class="btn btn-primary mt-2">Verify</button>
        </div>
    </form>
    </div>
  )
}

export default Resetting