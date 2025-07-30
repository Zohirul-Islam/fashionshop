import {Routes,Route} from 'react-router-dom';
import Home from './pages/Home'
import About from './pages/About'
import Cart from './pages/Cart';
import Collection from './pages/Collection';
import Product from './pages/Product';
import Login from './pages/Login';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';
import Navbar from './components/Navbar'
import Contact from './pages/Contact';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
 import { ToastContainer, toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <div className="px-3 sm:px-5 md:px-7 lg:px-9">
      <ToastContainer/>
      <Navbar/>
      <SearchBar/>
      <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path='/about' element = {<About/>}/>
        <Route path='/cart' element = {<Cart/>}/>
        <Route path='/collection' element = {<Collection/>}/>
        <Route path='/product/:id' element = {<Product/>}/>
        <Route path='/login' element = {<Login/>}/>
        <Route path='/place-orders' element = {<PlaceOrder/>}/>
        <Route path='/orders' element = {<Orders/>}/>
        <Route path='/contact' element = {<Contact/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App