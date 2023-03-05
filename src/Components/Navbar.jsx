import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import cartlogo from '../assets/cart.png'
import { useState, useEffect } from 'react'
import profilelogo from '../assets/profilelogo.png'
import '../cssModules/Navbar.css'
import { auth, db } from '../firebaseConfig/FirebaseConfig'
import { collection, getDocs, query, where } from 'firebase/firestore'


const Navbar = () => {


  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>> COPPYING FUCTION FROM HOME 
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
  const navigate = useNavigate()


  // <<<<<<<<<<<<<<<<<<<<< logout function<<<<<<<<<<<<<<


  const handleLogout=()=>{
    auth.signOut().then(()=>{
      navigate('/login')
    })
  }



  return (
    <>

      <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{ backgroundColor: "rgb(224,224,224)" }}>
        <div className="container-fluid">
          <NavLink className="navbar-brand" to='#'>Ecommerce</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse mx-5 " id="navbarNav" >
            {/* >>>>>>>>>>>>>>>>>>>>> cONDITION FOR USER NOT LOGGED */}



            {!loggeduser && 
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link active " aria-current="page" to='/home'>Home</NavLink>
              </li>
              <li className="nav-item ">
                <NavLink className="nav-link active " to='/signup'>Sign up</NavLink>
              </li>
              <li className="nav-item ">
                <NavLink className="nav-link active  " to='/login'>Login</NavLink>
              </li>

              <li className="nav-item ">
                <NavLink className="cart nav-link " to='/cart'>
                  <div className="cart-btn">
                  <span className="cart-icon-css">0</span>
                    <img src={cartlogo} alt="noimg" width={30} />
                    
                  </div>
                </NavLink>
              </li>
              <li className="nav-item ">
                <NavLink className="nav-link" to='/userprofile'>
                  <div className="profile-btn">
                    <img src={profilelogo} alt="noimg" className='profile-icon' width={60} />

                  </div>
                </NavLink>
              </li>
            </ul> 
            }
            {/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< if user logged in condition  */}

            {loggeduser &&

<ul className="navbar-nav">
              <li className="nav-item ">
                <NavLink className="nav-link active" aria-current="page" to='/home'>Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to='/cart'>
                  <div className="cart-btn">
                  <span className="cart-icon-css">{loggeduser[0].cart}</span>
                    <img src={cartlogo} alt="noimg" width={30}  className="cart-btn"/>
                  
                  </div>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to='/userprofile' >
                  {/* <div className="profile-btn"> */}
                    <img src={profilelogo} alt="noimg" className="profile-btn profile-icon"/>

                  {/* </div> */}
                </NavLink>
              </li>
              <li className="nav-item ">
                <button className='btn stylye-navbar logout-btn nav-link' onClick={handleLogout}>Logout</button>
              </li>
            </ul> 

             }

           
          </div>
        </div>

      </nav>
    </>
  )
}

export default Navbar