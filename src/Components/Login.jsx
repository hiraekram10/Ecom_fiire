import React from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import '../cssModules/Login.css'

const Login = () => {


  // <<<<<<<<<<<<<<<<<<<<<hooks    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [errorMssg, setErrorMssg] = useState('')
  const [successMssg, setSuccessMssg] = useState('')
  const auth = getAuth()
  const navigate = useNavigate()



    // ><<<<<<<<<<<<<<<<<<<<<<<  HANDLE LOGIN<<<<<<<<<<<<<<<<<<<<<
    const handleLogin=  (e)=>{
      e.preventDefault()
      // <<<<<<<<<<<<<<<<<<< using auth <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
   signInWithEmailAndPassword(auth,email,password)
  .then((userCredential)=>{
    const user = userCredential.user;
  setSuccessMssg('logged in sucessfully, You will be redirect to Home Page')
  setEmail('')
  setPassword('')
  setErrorMssg('')
   setTimeout (()=>{
  setSuccessMssg('')
  navigate('/home')
  },3000)

}).catch((error)=>{
  const errorCode = error.code;
  const errorMessage = error.message;
  setErrorMssg("Login error: ", errorCode, errorMessage)
  console.log("firebase login error: ", errorCode, errorMessage);

// <<<<<<<<<<<<<<<<<<<<<  comment this <<<<<<<<<<<<<<<<

  // if(errorCode == 'Firebase: error (auth/invalid-email)'){
  //   setErrorMssg('please fill all required field')

  // }
  // else if(errorCode == 'Firebase : error(auth/user-not-found)'){
  //   setErrorMssg('Email not found')
  // }else if(errorCode == 'Firebase: error (auth/wrong-password)'){
  //   setErrorMssg('Wrong password')
  // }
	


})



    }


  return (
    <>
       <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <p> Login</p>
          {successMssg&&<><div className='success-msg'>
            {successMssg}
          </div></>}
          {errorMssg &&<><div className='error-msg'>
            {errorMssg}
          </div></>}


          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" placeholder='default@gmailpassword' required onChange={(e) => setEmail(e.target.value)} />


          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" placeholder='Enter your password' required onChange={(e) => setPassword(e.target.value)} />


          <button type='submit' >Log In</button>
          <div>
            <span>Don't have an account</span>
            <NavLink to='/signup'>Sign Up</NavLink>
          </div>

        </form>
      </div>
    
    </>
  )
}

export default Login