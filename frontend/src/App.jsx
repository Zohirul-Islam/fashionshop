import {Routes,Route} from 'react-router-dom';
import Home from './pages/Home'
import About from './pages/About'
import Cart from './pages/Cart';
import Collection from './pages/Collection';
import Product from './pages/Product';
import Login from './pages/Login';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div className="px-3 sm:px-5 md:px-7 lg:px-9">
      <Navbar/>
      <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path='/about' element = {<About/>}/>
        <Route path='/cart' element = {<Cart/>}/>
        <Route path='/collection' element = {<Collection/>}/>
        <Route path='/product/:productId' element = {<Product/>}/>
        <Route path='/login' element = {<Login/>}/>
        <Route path='/place-orders' element = {<PlaceOrder/>}/>
        <Route path='/orders' element = {<Orders/>}/>
      </Routes>
    </div>
  )
}

export default App