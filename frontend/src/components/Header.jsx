import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { authenticationActions } from '../store'
import Swal from 'sweetalert2'

function Header() {
  const dispatch = useDispatch()
  let LoggedInUser = useSelector((state)=> state.LoggedInUser)
  const navigate = useNavigate()
  const logoutHandler = () => {
    Swal.fire({
      title: 'Are you sure You want To Logout?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Log Out!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(authenticationActions.logout())
        navigate('/login')
        Swal.fire(
          'LoggedOut!',
          'Your have Successfully Logged Out.',
          'success'
        )
      }
    })
  }
  // const handleLogout = () => {
  //   diapatch(authenticationActions.logout()).then(()=> navigate("/login"))
  // }
  return (
  <nav class="navbar navbar-expand-lg bg-primary fixed-top" data-bs-theme="dark">
  <div class="container-fluid">
    <Link to="/"><a class="navbar-brand" href="#" style={{fontSize: "2em" , fontFamily: "sans-serif" , color: "#ffb142" , fontWeight: "bolder"}}>YOU BLOG</a></Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      {
      LoggedInUser ?  (<Link to="/myblogs"><button class="btn  btn-warning" style={{marginLeft : "30vw" , width: "100px"}} type="button">My Blogs</button></Link>)
                   :  ('')
      }  
      {
      LoggedInUser ?  (<Link to="/myblogs/add"><button class="btn  btn-warning" style={{marginLeft : "2vw" , width: "100px"}} type="button">Add Post</button></Link>)
                   :  ('')
      }  
        <div class="d-grid gap-2 d-md-flex justify-content-md-end ms-auto">
            { LoggedInUser 
              ? (<button class="btn  btn-danger" type="button" onClick={logoutHandler}>Logout</button>) 
              : (<Link to="/login"><button class="btn  btn-success me-md-2" type="button">Login</button></Link> ) }
            {  
             LoggedInUser ?  ('')
                          :  (<Link to="/register"><button class="btn  btn-warning" type="button">Register</button></Link>)
            }              
        </div>
    </div>
  </div>
</nav>
  )
}

export default Header