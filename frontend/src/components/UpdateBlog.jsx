import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Toast } from './Toast'
import Swal from 'sweetalert2'
// import { decryptiondata } from '../Crypto'

function UpdateBlog() {
  // const updatebloggingid = localStorage.getItem('blogid')
  const  {id}  = useParams()
  const navigate = useNavigate()
  const user = localStorage.getItem('userID')
  var reloaded = 1
  
  useEffect( ()=>{
    const res = async () => {
     
      const res = await axios.post(`http://localhost:5000/api/blogs/${id}`,{
        users :  user
      })
     
      const data = await res.data
      localStorage.setItem('gettopic',data.topic)
      localStorage.setItem('getdescription',data.description)
      localStorage.setItem('getimage',data.image)
      // setTopic(data.topic)
      // topicset = data.topic
      // setDescription(data.description)
      // setImage(data.image)
      // console.log(gettopic)
      // console.log(data)
      if(!localStorage.getItem('reloaded')){
        window.location.reload()
        localStorage.setItem('reloaded',1)
      }
      if(data.type === 'warning' || data.type === 'error'){
        console.log('hi')
        navigate('/myblogs')
        Toast.fire({
          icon : data.type,
          title : data.message
        })
      }
      return data
    }
    res()
    
  })
  // window.location.reload()
  const[input,SetInput] = useState({
    topic : localStorage.getItem('gettopic'),
    description : localStorage.getItem('getdescription'),
    image : localStorage.getItem('getimage'),
    user : user,

  })
 
  // window.onload = function () {
  //   setTimeout (function (){
  //     window.location.reload()
  //   },1500)
  // }

  // window.onload = function () {
  //   if(!reloaded){
  //     reloaded = true;
  //     window.location.reload()
  //   }
  // }
  // window.onpageshow = function () {
  //   window.location.reload()
  // }
  const inputHandler = (e) => {
      SetInput((previousstate)=> ({
        ...previousstate,
        [e.target.name] : e.target.value,
      }))
  }
  const imageHandler = (e) => {
      SetInput((previousstate)=> ({
        ...previousstate,
        image : e.target.files[0],
      }))
  }
  
  const updatePost = async () => {
    const formdata = new FormData()
    const topic = formdata.append('topic',input.topic)
    const description = formdata.append('description',input.description)
    const user = formdata.append('user',input.user)
    const image = formdata.append('image',input.image)
    const res = await axios.patch(`http://localhost:5000/api/blogs/update/${id}`,formdata,{
      headers : {
        "Content-Type" : "multipart/form-data"
      }
    }).catch(err => console.log(err))
    const data = await res.data
    console.log(data)
    return data
  }
  const submitHandler = (e) => {
      e.preventDefault()
      Swal.fire({
        title: 'Do you want to Update the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Update',
        denyButtonText: `Don't Update`,
      }).then((result) => {
        if (result.isConfirmed) {
          updatePost().then((data)=>{
            if(data.Blog){
            Swal.fire('Saved!', '', 'success')
             setTimeout(function(){          
              window.location.reload()
              window.location.href = "http://localhost:3000/myblogs"
             },1000)
             localStorage.removeItem('gettopic')
             localStorage.removeItem('getdescription')
             localStorage.removeItem('getimage')
             localStorage.removeItem('reloaded')
             
            
            }
          })
          
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
      // updatePost().then((data)=>{
      //   if(data.Blog){
      //    Toast.fire({
      //     icon: 'success',
      //     title: 'Your Blog Post Updated Successfully',
      //     timer : 2000
      //    })
      //    setTimeout(function(){          
      //     window.location.reload()
      //     window.location.href = "http://localhost:3000/myblogs"
      //    },2100)
      //    localStorage.removeItem('gettopic')
      //    localStorage.removeItem('getdescription')
      //    localStorage.removeItem('getimage')
      //    localStorage.removeItem('reloaded')
         
        
      //   }
      // })
      // updatePost()
  }
  // const {id}= decryptiondata(encryptData)
  return (
    <div class="container" style={{width: "50vw" , backgroundColor: "#f368e0" , borderRadius: "10px" , boxShadow: "5px 15px" , marginTop: "100px"}}>
    <div class="row text-center p-4" style={{height : "70px"}}>
      <h1 style={{fontFamily: "'Kanit', sans-serif" , color: "#130f40" , height : "50px"}}>Update Your Own Post</h1>
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
          <input type="file" class="form-control" id="exampleInputPassword1"  name='image'  onChange={imageHandler} required/>
        </div>
        <button type="submit" class="btn btn-primary w-100 mt-2 p-2">Update Post</button>
    </form>
  </div>
</div>
  )
}

export default UpdateBlog