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
          console.log("Raw cart response:", cartData);

          // Handle case where cart is empty (404 error)
    if (error && error.message && error.message.includes('404')) {
      console.log("Cart is empty");
      setCartItems([]);
      setTotalAmount(0);
      return;
    }
          
          // Check if cartData exists and has items
          if (cartData) {
            let items = [];
            let total = 0;
            
            // Case 1: Data is directly in cartData
            if (Array.isArray(cartData)) {
              items = cartData;
              total = cartData.reduce((sum, item) => sum + (parseInt(item.total) || 0), 0);
            } 
            // Case 2: Data is in cartData.data
            else if (cartData.data && Array.isArray(cartData.data)) {
              items = cartData.data;
              total = cartData.totalAmt || items.reduce((sum, item) => sum + (parseInt(item.total) || 0), 0);
            } 
            // Case 3: Data contains success property (from our updated backend)
            else if (cartData.success && cartData.data && Array.isArray(cartData.data)) {
              items = cartData.data;
              total = cartData.totalAmt || 0;
            }
            
            console.log("Processed cart items:", items);
            console.log("Calculated total:", total);
            
            setCartItems(items);
            setTotalAmount(total);
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
            <h4 className="pt-2">{items.product?.name}</h4>
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