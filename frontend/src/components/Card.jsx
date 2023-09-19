import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { encryptiondata } from '../Crypto'
import axios from 'axios'
import Swal from 'sweetalert2';


function Card({topic,description,user,image,uid,blogid}) {
  // localStorage.setItem('blogid',blogid)
  // blogid = encodeURIComponent(blogid)
  // const encryptData = encryptiondata(blogid)
  const id = blogid;
  const navigate = useNavigate()
  const deletehandle = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const deleteconfirm = async () => {
        const res =  await axios.delete(`http://localhost:5000/api/blogs/delete/${id}`) 
        const data = res.data        
        window.location.href = "http://localhost:3000/myblogs"
        return data
        }
        deleteconfirm()
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
     
  }
  return (
    <div style={{textAlign: "center" , display: "flex" , marginTop: "5px" , justifyContent: "center"}}>
        <div class="card mb-3" style={{width: "auto"}}>
            {/* <div style={{position: "absolute" , display : "flex" , flexDirection : "row" , columnGap: "10px", justifyContent: "right" , width: "85vh"  }}>
              {
                id ?   
                  ( <Link><img src= './edit.svg'  alt="No Image" style={{cursor : 'pointer'}}/></Link> )
                  : ('')               
              }     
              {
                id ? 
                 ( <Link><img src= './delete.svg' alt="No Image" style={{cursor : 'pointer'}}/></Link> )
                : ('')  
              }
            </div> */}
            <div class="p-5">
                <img src={image} class="card-img-top" alt="No Image" style={{width : "400px" , height : "400px"}}/>
            </div>
            <div class="card-body" style={{height : "auto" , maxWidth: "500px" ,textAlign: "left"}}>
                <h5 class="card-title text-center" style={{fontSize: "3rem"}}>{topic}</h5>
                <p class="card-text" style={{fontWeight: "bolder"}}>{description}</p>
                  {
                    uid 
                    ? ('')
                    : (<p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago by {user}</small></p>)
                  } 
                  <div class="row">
                    <div class="col-6 text-center">
                      {
                        uid 
                        ? (<a href={`/myblogs/update/${blogid}`}><button class="btn btn-success">Update</button></a>)
                        : ('')
                      }
                      </div>
                      <div class="col-6 text-center">
                      {
                        uid 
                        ? (<button class="btn btn-danger" onClick={deletehandle}>Delete</button>)
                        : ('')
                      }
                      </div>
                  </div>
            </div>
        </div>
    </div>

  )
}

export default Card