import { Link, useLocation, useNavigate } from "react-router-dom"
import {firebaseConfig} from "./firebaseConfig.js"
 import { initializeApp } from "firebase/app";
 import {getAuth,signInWithEmailAndPassword,createUserWithEmailAndPassword} from 'firebase/auth'
import { useEffect, useState } from "react";


const Login = () => {

  const app=initializeApp(firebaseConfig)
  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')
  const [userNotExists,setUserNotExists]=useState(true)
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const auth=getAuth()


  const validation = (fieldName, value) => {
    switch(fieldName) {
      case 'email':
        return value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      case 'password':
        return value.length >= 6;
      default:
        break;
    }
  };

const navigate=useNavigate()
const location=useLocation()
const inLoginPage=location.pathname==="/login" ? true : false;
  const ClickHandler=(e)=>{
    e.preventDefault()
    if(!validation('email', email) || !validation('password', password)){
      setEmailValid(validation('email', email));
      setPasswordValid(validation('password', password));
      return;
    }
    if(inLoginPage){

      signInWithEmailAndPassword(auth,email,password).then((auth)=>{
        if(auth){
          navigate(
            "/dashboard"
          )
        }
      }).catch(error=> setUserNotExists(false))
    }else{
             createUserWithEmailAndPassword(auth,email,password).then(
              (auth)=>{
                if(auth){
                  navigate("/dashboard")
                }
              }
             ).catch((err)=>{
              setUserNotExists(false)
             })
    }

setEmail("")
setPassword("")
  }

  useEffect(()=>{
    setUserNotExists(true)
  },[location])
    return (
      <div>
      <div className="login">
        <div className="holder">
          <h1 className="text-white">{inLoginPage ? "Sign In" : "register"}</h1>
          <br/>
          <form>
            <input className="form-control" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email"/>
            { !emailValid && <p className="text-danger">Email is invalid/blank</p> }
            <input className="form-control" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
            { !passwordValid && <p className="text-danger">Password is invalid/blank</p>}
            <button className="btn btn-danger btn-block" onClick={ClickHandler}>{inLoginPage ? "Sign In" : "register"}</button>
            <br/>
            { inLoginPage && <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
              <label className="form-check-label text-white" for="flexCheckDefault">
                Remember Me
              </label>
            </div>}
          </form>
          <br/>
          <br/>
     { !userNotExists && inLoginPage
     &&

     <p className="para">User Do Not Exists Or Auth URL has Expires | <span>| "url= /dashboard to move futher"</span></p>
     } 
      { !userNotExists && !inLoginPage
     &&

     <p className="para"> User Already Exists Or Auth URL has Expires | <span>| "url= /dashboard to move futher"</span></p>
     } 
          <div className="login-form-other">
            <div className="login-signup-now">{inLoginPage ? "New to Netflix?" : "Existing User?"}&nbsp;
              <Link className=" "  to={inLoginPage ? "/register":"/login"}>{inLoginPage ? "Sign up now" : "Sign In"}</Link>.
            </div>
          </div>
        </div>
        <div className="shadow"></div>
        <img className="concord-img vlv-creative" src="https://assets.nflxext.com/ffe/siteui/vlv3/6e32b96a-d4be-4e44-a19b-1bd2d2279b51/ee068656-14b9-4821-89b4-53b4937d9f1c/IN-en-20220516-popsignuptwoweeks-perspective_alpha_website_small.jpg" srcset="https://assets.nflxext.com/ffe/siteui/vlv3/6e32b96a-d4be-4e44-a19b-1bd2d2279b51/ee068656-14b9-4821-89b4-53b4937d9f1c/IN-en-20220516-popsignuptwoweeks-perspective_alpha_website_small.jpg 1000w, https://assets.nflxext.com/ffe/siteui/vlv3/6e32b96a-d4be-4e44-a19b-1bd2d2279b51/ee068656-14b9-4821-89b4-53b4937d9f1c/IN-en-20220516-popsignuptwoweeks-perspective_alpha_website_medium.jpg 1500w, https://assets.nflxext.com/ffe/siteui/vlv3/6e32b96a-d4be-4e44-a19b-1bd2d2279b51/ee068656-14b9-4821-89b4-53b4937d9f1c/IN-en-20220516-popsignuptwoweeks-perspective_alpha_website_large.jpg 1800w" alt=""></img>
      </div>
      </div>
    )
  }
  
  export default Login;