import React from 'react'
import Banner from './Banner'
import { useState, useEffect } from 'react'
import Products from './Products'
import { auth, db } from '../firebaseConfig/FirebaseConfig'
import { collection, getDocs, query, where } from 'firebase/firestore'


const Home = () => {
  // >>>>>>>>>>>>>>>>>>>> datastorage <<<<<<<<<<< 

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



  return (
    <div>
      <Banner />
      <Products />
      <p>{loggeduser ? loggeduser[0].email : 'No Data'}</p>

    </div>
  )
}

export default Home