import React, { useEffect } from 'react';
import './App.css';
import Home from './Home';
import Header from './Header';
import {Router, Route, Routes, BrowserRouter,} from "react-router-dom"
import Layout from './Layout';
import CheckOut from './CheckOut';
import Login from './Login';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { setUser } from './features/user/userSlice';


function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    axios({
      withCredentials: true,
      url: "http://localhost:4000/api/v1/authenticate",
      method: "GET",
    }).then((response)=>{
      console.log(response);
      if(response.status == 200){
        dispatch(setUser(response.data))
      }else{
        dispatch(setUser({result: "no user"}))
      }
    })
  },[])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/>

          <Route path='/checkout' element={<CheckOut/>}/>
        </Route>
        <Route path='/login' element={<Login/>}/>
        
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;
