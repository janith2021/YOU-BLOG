import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import Blogs from './components/Blogs';
import Register from './components/Register';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Myblogs from './components/Myblogs';
import UpdateBlog from './components/UpdateBlog';
import Addpost from './components/Addpost';
import Redirecthandling from './Redirecthandling';
import InvalidPage from './components/InvalidPage';
import { authenticationActions } from './store';
import Reset from './components/Reset';
import Verification from './components/Verification';
import Resetting from './components/Resetting';

function App() {
  const LoggedInUser = useSelector(state => state.LoggedInUser)
  const dispatch = useDispatch()
  useEffect(()=>{
    if(localStorage.getItem('userID')){
        dispatch(authenticationActions.login())
    }
  },[dispatch])

  console.log(LoggedInUser)
  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          { LoggedInUser 
             
              ?  <> <Route path='/' element={<Blogs/>} />
                <Route path='/myblogs' element={<Myblogs/>} />
                <Route path='/myblogs/update/:id' element={<UpdateBlog />} /> 
                <Route path='/myblogs/add' element={<Addpost />} /> </>
              :  <><Route path='/login' element = {<Login />}/> 
                <Route path='/register' element={<Register />} /> 
                <Route path='/' element={<Blogs/>} />
                <Route path='/reset' element={<Reset/>} />
                <Route path='/verify' element={<Verification/>} />
                <Route path='/resetting' element={<Resetting/>} />
                </>
          }
          <Route path='*' element={<InvalidPage />}/>
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
