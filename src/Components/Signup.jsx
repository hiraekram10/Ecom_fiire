import React from 'react'
import '../cssModules/Signup.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebaseConfig/FirebaseConfig';
import { collection, addDoc } from 'firebase/firestore'



// >>>>>>>>>>>>>>>>>>>>>>>> real function start<<<<<<<<<<<<<<<<<<
const Signup = () => {



  // >>>>>>>>>>>>DEFINING values hooks\

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("")
  const [phonenumber, setPhonenumber] = useState("");
  const [address, setAddress] = useState("")

  //>>>>>>>>>>>>> NAVIGATE MAKING ////////// WILL GO TO LOGIN PAGE

  const navigate = useNavigate()



  // >>>>>>>>>>>>>>>>>>>>>>>>>> for showing ERROR MSSG>>>>>>>>>>>>>>>>>>>

  const [errorMssg, setErrorMssg] = useState("")
  const [successMssg, setSuccessMssg] = useState("")



  // >>>>>>>>>>>>>>>>>handle submit<<<<<<<<<<<<<<<<<<<<


  const handleSubmit = (e) => {
    e.preventDefault();
    // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<  Auth  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // >>>>>>>>> for new user cart
        const initialcartvalue = 0;
        console.log(user)

        // >>>>>>>  putting data in firebase use add doc
        addDoc(collection(db, "users"), {
          username: username, email: email, phonenumber: phonenumber, password: password, cart: initialcartvalue, address: address, uid: user.uid
        }).then(() => {
          alert("added sucessfully")
          setSuccessMssg('New user added succcesfully, You will be automatically redirect to login page.')
          setUsername("")
          setPhonenumber("")
          setEmail("")
          setPassword("")
          setAddress("")
          setErrorMssg("")
          // >>>>>>>>>>>>>>>>>>>>>>>>>>>> Redirect to login page<<<<<<<<<<<<<<<<<<<<<<<

          setTimeout(() => {
           setSuccessMssg('')
            navigate('/login')
          }, 4000)
        }).catch((error) => {setErrorMssg(error.message) 
        })
      }).catch((error) => {
        if (!error.message) {
          setSuccessMssg('created acount succesfully click on ok to further proceed')

        }
       else if (!username || !phonenumber || !email || !password || !address ) {
          setErrorMssg('please fill all the given fields')
        } else if (error.message == error.code){ 
           setErrorMssg('strong password needed')
          }
        else{
            setErrorMssg('User already exist')
        }
        

      })

  }

  return (
    <>
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <p> Create Account</p>
          {successMssg&&<><div className='success-msg'>
            {successMssg}
          </div></>}
          {errorMssg &&<><div className='error-msg'>
            {errorMssg}
          </div></>}



          <label htmlFor="name">Your name:</label>
          <input type="text" name="name" id="name" placeholder='First & Last name' required onChange={(e) => setUsername(e.target.value)} />


          <label htmlFor="number">Mobile Number</label>
          <input type="number" name="number" id="number" placeholder='+92333333333' required onChange={(e) => setPhonenumber(e.target.value)} />


          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" placeholder='default@gmailpassword' required onChange={(e) => setEmail(e.target.value)} />


          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" placeholder='Enter your password' required onChange={(e) => setPassword(e.target.value)} />


          <label htmlFor="mssg"></label>
          <textarea type="text" name="address" id="mssg" placeholder='Enter your password' required onChange={(e) => setAddress(e.target.value)}></textarea>


          <button type='submit'>Sign up</button>
          <div>
            <span>Already have an account</span>
            <NavLink to='/login'>Sign In </NavLink>
          </div>

        </form>
      </div>
    </>
  )
}

export default Signup