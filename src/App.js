import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css';
import Cart from './Components/Cart';
import Home from './Components/Home';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import Pgfof from './Components/Pgfof';
import UserProfile from './Components/UserProfile';
import Signup from './Components/Signup';
import 'bootstrap/dist/css/bootstrap.css'
import AddProduct from './Components/AddProduct.jsx';



function App() {
  return (
    <>
     <BrowserRouter>
     <Navbar />
     <Routes>
 <Route exact path='/' element={<Home/>}/>
 <Route exact path='/home' element={<Home/>}/>
 <Route path='/sellproduct' element={<AddProduct/>}/>
 <Route path='/signup' element={<Signup/>}/>
 <Route path='/login' element={<Login/>}/>
 <Route path='/cart' element={<Cart/>}/>
 <Route path='/userprofile' element={<UserProfile/>}/>
 <Route path='/*' element={<Pgfof/>}/>
     </Routes>
     </BrowserRouter>
    </>
  );
}

export default App;
