import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Toast } from './Toast'

function Addpost() {
  const navigate = useNavigate()
    const user = localStorage.getItem('userID')
    const [input,SetInput] = useState({
        topic : "",
        description : "",
        image : null,
        user : user 

    })

    const inputHandler = (e)=> {
        SetInput((previousState) => ({
            ...previousState,
            [e.target.name] : e.target.value
        }))
    }
    const imageHandler = (e)=>{
            SetInput((previousState) => ({
                ...previousState,
                image : e.target.files[0],
    
            }))
    }
    const addpost = async () => {
        const formdata = new FormData()
        const topic = formdata.append('topic',input.topic)
        const description = formdata.append('description',input.description)
        const image = formdata.append('image',input.image)
        const user = formdata.append('user',input.user)
        const res = await axios.post("http://localhost:5000/api/blogs/",formdata,{
        headers : {
          "Content-Type" : "multipart/form-data",
        }     
     }).catch(err => console.log(err))
        const data = await res.data
        data.message 
        ? (await Toast.fire({
              icon : data.type,
              title : data.message
          }) 
          )
        : console.log(data) 
        return data;
    }
    const submitHandler = (e) => {
        e.preventDefault()
        addpost().then(()=>{
          navigate("/myblogs")
        })
        console.log(input)
   }
  return (
    <div class="container" style={{width: "50vw" , backgroundColor: "#f368e0" , borderRadius: "10px" , boxShadow: "5px 15px" , marginTop: "100px"}}>
    <div class="row text-center p-4" style={{height : "70px"}}>
      <h1 style={{fontFamily: "'Kanit', sans-serif" , color: "#130f40" , height : "50px"}}>Create Your Own Post</h1>
    </div>
    <div class="row p-5">
      <form onSubmit={submitHandler} encType='multipart/form-data'>
        <div class="mb-2">
          <label for="exampleInputEmail1" class="form-label" style={{fontSize : "15pt" , fontWeight: "bolder"}}>Topic</label>
          <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={input.topic} name='topic' onChange={inputHandler}  required/>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label" style={{fontSize : "15pt" , fontWeight: "bolder"}}>Description</label>
          <textarea type="text" class="form-control" id="exampleInputPassword1" style={{height : "20vh"}} value={input.description} name='description' onChange={inputHandler} required/>
        </div>
        <div class="mb-4">
          <label for="exampleInputPassword1" class="form-label" style={{fontSize : "15pt" , fontWeight: "bolder"}}>Image</label>
          <input type="file" class="form-control" id="exampleInputPassword1"  name='image' onChange={imageHandler} required/>
        </div>
        <button type="submit" class="btn btn-primary w-100 mt-2 p-2">Create Post</button>
    </form>
  </div>
</div>
  )
}

export default Addpost