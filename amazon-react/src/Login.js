import { Button, CircularProgress } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from './features/user/userSlice'

function Login() {
    const [email, setEmail] = useState("")
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [isLogin, setIsLogin] = useState(true)
    const [errs, setErrs] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(()=>{
      axios(
        {
          url: "http://localhost:4000/api/v1/logout",
          method: "GET",
          withCredentials: true,
          headers: {'Content-Type': 'application/json'},
        }
      ).then(res=>{
        console.log(res.data)
      })
    },[])
    
    const signInOrLogin = ()=>{
      setIsLoading(true)
      setErrs({})
      if(isLogin){ 
        console.log("working.."); 
        axios(
          {
            url: "http://localhost:4000/api/v1/login",
            method: "POST",
            withCredentials: true,
            headers: {'Content-Type': 'application/json'},
            data:JSON.stringify({
              password: password,
              email: email,
              })
          }
        ).then((response)=>{
          console.log(response.data);
              if(response.data.errors){
                console.log(`your error: ${response.data.errors}`);
                setErrs(response.data.errors)
                setIsLoading(false)
                
              }else {
                dispatch(setUser(response.data))
                setIsLoading(false)
                navigate('/')
  
              }
        })
      }else{
        axios(
          {
            url: "http://localhost:4000/api/v1/signup",
            method: "POST",
            withCredentials: true,
            headers: {'Content-Type': 'application/json'},
            data:JSON.stringify({
              userName:userName,
              password: password,
              email: email,
              })
          }
        ).then((response)=>{
          console.log(response.data);
              if(response.data.errors){
                console.log(`your error: ${response.data.errors}`);
                setErrs(response.data.errors)
                setIsLoading(false)
                
              }else {
                dispatch(setUser(response.data))
                setIsLoading(false)
                navigate('/')
  
              }
        })
      }
    }
  return (
    <div className='flex justify-center h-max'>
      <div className='flex flex-col justify-center items-center space-y-4'>
        <Link to={"/"}><img width={200} className="mx-4 mt-4 mb-1 h-28" alt='logo' src='https://th.bing.com/th/id/OIP.tSw956CIEDb7OPUEwElT_AHaEK?w=332&h=186&c=7&r=0&o=5&pid=1.7'/></Link>
        <div className=' p-7 rounded-sm shadow-md flex flex-col'>
            <h1 className=' text-3xl mb-4'>{isLogin?"Sign In":"Sign Up"}</h1>
            {
             isLogin?
             <></>:
            <div className='flex flex-col mb-3'>
                <label htmlFor='userName' className=' font-semibold'>User Name</label>
                <input className='p-2 border-2 rounded-sm' type={"text"} id="userName" value={userName} name="userName" onChange={e=>setUserName(e.target.value)}/>  
                {
                  errs.userName ?
                  <p className=' text-red-700 border-red-500 border-solid border-2 p-2'>{errs.userName}</p>
                  :<></>      
                } 
            </div>
            }
            <div className='flex flex-col mb-3'>
                <label htmlFor='email' className=' font-semibold'>Email</label>
                <input className='p-2 border-2 rounded-sm' type={"email"} id="email" value={email} name="email" onChange={e=>setEmail(e.target.value)}/>         
                {
                  errs.email ?
                  <p className=' text-red-700 border-red-500 border-solid border-2 p-2 m-1'>{errs.email}</p>
                  :<></>      
                } 
            </div>
            <div className='flex flex-col mb-3'>
                <label htmlFor='password' className=' font-semibold'>Password</label>
                <input className='p-2 border-2 rounded-sm' type={"password"} id="password" value={password} name="password" onChange={e=>setPassword(e.target.value)}/>         
                {
                  errs.password ?
                  <p className=' text-red-700 border-red-500 border-solid border-2 p-2 m-1'>{errs.password}</p>
                  :<></>      
                } 
            </div>
            {
              isLoading?
              <center><CircularProgress/></center>:
              <button onClick={()=>signInOrLogin()} className='bg-yellow-500 rounded-sm mb-4 p-2 active:bg-yellow-400'>Continue</button>
            }
            <p className=' text-sm mb-5'>By Continuing, you agree to Amazon's Conditions of <a href='/' className=' text-blue-800'>Use</a> and <a href='/' className=' text-blue-800'>Privacy Notice.</a></p>
            <a href='/' className=' text-blue-800 text-sm'>Need help?</a>
        </div>
        <div className='  flex flex-col relative items-center'>
            <hr className='absolute min-w-fit w-96'/>
            <p className=''>{isLogin?"New to Amazon":"Already have an account"}</p>
        </div>
        
          <Button onClick={()=>setIsLogin(!isLogin)}>{isLogin ?"Create your Amazon account" : "Login"}</Button>
       
      </div>
    </div>
  )
}

export default Login
