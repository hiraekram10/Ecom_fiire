import React from 'react'
import '../cssModules/Userprofile.css'
import {updateProfile} from 'firebase/auth'
import { auth, db } from '../firebaseConfig/FirebaseConfig'
import { collection, getDocs, query, where, doc, updateDoc } from 'firebase/firestore'
import { useState, useEffect } from 'react'




const UserProfile = () => {
// <<<<<<<<<<<<<<<<<<<<<<<<<<<< COPY FUNCTION >>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function GetCurrentUser() {
  const [user, setUser] = useState('');
  const usersCollectionRef = collection(db, 'users')   //in folder data


  // useeffect 
  useEffect(() => {
    auth.onAuthStateChanged(userlogged => {
      if (userlogged) {
        const getUsers = async () => {
          const myquery = query(collection(db, 'users'), where('uid', '==', userlogged.uid))
          // console.log(myquery);


          // >>>>>>>>>>>>>>>>> MAKE A DOCUMENT TO STORING DATA OF USER <<<<<<<<<<<<<<<<<<<<<<<<<
          const data = await getDocs(myquery)
          setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }
        getUsers();
      } else {
        setUser(null)
      }
    })

  }, [])

  return user

}
const loggeduser = GetCurrentUser();
useEffect(()=>{  if(loggeduser){
  console.log(loggeduser)
  console.log(loggeduser[0].email)}

},[])


// <<<<<<<<<<<<<<<<<<<<< logout function<<<<<<<<<<<<<<




  return (
<>
<div className="userprofile-outercontainer row">
  {/* <<<<<<<<<<<<<<<<<<< showing user detail */}
  {loggeduser ?<div className='col-md-5'>
    <h3>Your account details</h3>
    <div className="data-row">
      <span> Name:</span>
      <span>{loggeduser[0].username}</span>
    </div>
    <div className="data-row">
      <span>your Email:</span>
      <span>{loggeduser[0].email}</span>
    </div>
    <div className="data-row">
      <span> Your Phone Number:</span>
      <span>{loggeduser[0].phonenumber}</span>
    </div>
    <div className="data-row">
      <span>your Address:</span>
      <span>{loggeduser[0].address}</span>
    </div>
  </div>

  :  
  
  // if not logged in
  <div className="col-md-5"><h1>logged in your profile further Proceed</h1></div>}
  
 

</div>
</>
  )
}

export default UserProfile