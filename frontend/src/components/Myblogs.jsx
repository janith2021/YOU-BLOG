import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Card from './Card'
import { Link } from 'react-router-dom'

function Myblogs() {
    const[blogs,setBlog] = useState()
    const[email,setUser] = useState()
    const[message,setMessage] = useState()
    const id = localStorage.getItem('userID')
    const sendingRequest = async () => {
        const res = await axios.get(`http://localhost:5000/api/blogs/user/${id}`).catch(err => console.log(err))
        const data = await res.data
        // if(data.message){
        //     alert(data.message)
        // }          

        return data
    }
    useEffect(()=>{
        sendingRequest().then((data)=> 
        {
            if(data.blogs){
                setBlog(data.blogs)
                setUser(data.user)
            }else{
                setMessage(data.message)
            }     
        })
    },[])
      console.log(blogs)
  return (
    <div style={{marginTop: "100px"}}>
        
        {
         message ?  <><h1 style={{textAlign: 'center' , color : 'white' , fontSize : '3.5rem' , height: "auto" , marginTop : "30vh" , textTransform: "uppercase"}}>{message}</h1>
                       <div class="container text-center">
                       <Link to="/myblogs/add"><button class = "btn btn-warning mt-2  w-50" style={{backgroundColor : "#A3CB38"}}><span style={{fontSize: "2rem" , color:"#1B1464" , fontWeight: "bolder" , textTransform: "uppercase"}}>Add Your First Blog</span></button></Link>
                       </div>
                    </>
                 :    blogs && blogs.map((blogging,index) => <Card  topic = {blogging.topic} description={blogging.description} image={blogging.image} uid = {email} blogid = {blogging._id}/>)        
                 
        }
    </div>
  )
}

export default Myblogs