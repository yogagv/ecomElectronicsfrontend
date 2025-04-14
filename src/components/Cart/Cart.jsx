import React, { useContext, useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch'
import { BASE_URL, token } from '../utils/config'
import Loading from '../Loading/Loading'
import { AuthContext } from '../Context/AuthContext'
import './cart.css'


const Cart = () => {

  const [trigger, setTrigger] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const {user} = useContext(AuthContext)


  const {data:cartData,
         loading,
         error,
        //  setData: setCartData
        }  = useFetch(`${BASE_URL}/cart/getCart/${user._id}`, trigger)

        console.log(cartData);

        useEffect(() => {
          console.log("Complete cart response:", cartData);
          
          if (cartData) {
            // Check the structure
            // console.log("Cart data type:", typeof cartData);
            // console.log("Is data array?", Array.isArray(cartData.data));
            
            if (cartData.data && Array.isArray(cartData.data)) {
              // console.log("Cart items count:", cartData.data.length);
              setCartItems(cartData.data);
              setTotalAmount(cartData.totalAmt || 0);
            } else if (Array.isArray(cartData)) {
              // If cartResponse itself is an array
              // console.log("CartResponse is an array with length:", cartData.length);
              setCartItems(cartData);
              // In this case we don't have a separate total field
              // Calculate total from items
              const total = cartData.reduce((sum, item) => sum + (item.total || 0), 0);
              setTotalAmount(total);
            }
          }
        }, [cartData]);

        // const totalAmount = cartData?.totalAmt || 0;

        const handleRemove = async (userId, ProductId) => {

          try{

            const res = await fetch(`${BASE_URL}/cart/removeCart/${userId}/${ProductId}`, {
              method:"DELETE",
              headers:{
                "Authorization":`Bearer ${token}`
              },
              body: JSON.stringify({ quantity: 1 })
            })

            const data = await res.json();
            if(!res.ok){

              console.error("Error removing product:", data);
            }
            else{

              console.log(data.message);
              setTrigger(Date.now());
            }
              
        } catch(error) {

          console.error('Unable to remove the product:', error);
              
        }

        }

  return (
    <>
    <h2 className='text-center'>Cart Page</h2>
    {loading && <h1><Loading /></h1>}
{error && <h1>Error</h1>}
{!loading && !error && (
  cartItems && cartItems.length > 0 ? 
    cartItems.map((items) => (
        <div className="container" key={items._id}>
        <div className="row w-100 cartdata mt-3">
          <div className="col-md-4 mt-4">
            <img src={items.product.imageurl} className="h-100 w-50 ms-5" alt="" />
          </div>
          <div className="col-md-6">
            <h4 className="pt-2">{items.product.name}</h4>
            <h4 className="pt-2">{items.product.category}</h4>
            <p className="pt-2">{items.product.shortDesc}</p>
          </div>
          <div className="col-md-2 mt-5">
          <div className='mt-2'>Quantity: {items.quantity}</div>
            <div className='mt-2'>Price: ${items.total}</div>
            <button className='btn btn-danger mt-2' onClick={() => {handleRemove(user._id, items.product.id)}}>Remove</button>
          </div>
        </div>
      </div>
    ))
   : (
    <h2 className="text-center">Cart is empty</h2>
  )
)}

{!loading && !error && cartItems && (
        <div className="text-center mt-4">
          <h3>Total Amount: $ {totalAmount}</h3>
        </div>
      )}
    
    </>
  )
}

export default Cart