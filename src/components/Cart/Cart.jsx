import React, { useContext } from 'react'
import useFetch from '../hooks/useFetch'
import { Link, useParams } from 'react-router-dom'
import { BASE_URL } from '../utils/config'
import Loading from '../Loading/Loading'
import { AuthContext } from '../Context/AuthContext'
import { Nav } from 'react-bootstrap'
import './cart.css'

const Cart = () => {

  const { id } = useParams()

  const {user} = useContext(AuthContext)


  const {data:cartData,
         loading,
         error
        }  = useFetch(`${BASE_URL}/cart/getCart/${id}`)
  

        if (!user) {

          return (
            <div className="text-center mt-5 cart-display">
              <h2>Please log in to view your cart</h2>
              <Nav.Link as={Link} to="/signin" id='register' className='fw-bold'>Sign in 
                </Nav.Link>
            </div>
          );
        }

  return (
    <>
    <h2 className='text-center'>Cart Page</h2>
    {loading && <h1><Loading /></h1>}
{error && <h1>Error</h1>}
{!loading && !error && (
  cartData && cartData.length > 0 ? (
    cartData.map((product) => (
      <div className="container" key={product.id}>
        <div className="row w-100 cartdata mt-3">
          <div className="col-md-4 mt-4">
            <img src={product.image} className="img-fluid h-75 w-50 ms-5 mt-1" alt={product.title} />
          </div>
          <div className="col-md-6">
            <h4 className="pt-2">{product.title}</h4>
            <h4 className="pt-2">{product.category}</h4>
            <p className="pt-2">{product.description}</p>
          </div>
          <div className="col-md-2 mt-5">
            <div>Price: ${product.price}</div>
          </div>
        </div>
      </div>
    ))
  ) : (
    <h2 className="text-center">Cart is empty</h2>
  )
)}

    
    </>
  )
}

export default Cart