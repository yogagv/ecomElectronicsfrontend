import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Home/Home'
import Shop from '../Shop/Shop'
import Cart from '../Cart/Cart'
import Register from '../Register/Register'
import Signin from '../Signin/Signin'
import SingleProduct from '../SingleProduct/SingleProduct'


const Routing = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/shop' element={<Shop />}/>
            <Route path='/cart' element={<Cart />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/signin' element={<Signin />}/>
            <Route path='/:id' element={<SingleProduct />}/>
        </Routes>
    </div>
  )
}

export default Routing