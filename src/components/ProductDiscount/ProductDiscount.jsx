import React, { useContext } from 'react'
import './productdiscount.css'
import { BASE_URL, token } from '../utils/config'
import useFetch from '../hooks/useFetch'
import Loading from '../Loading/Loading'
import {  Button, Card } from 'react-bootstrap'
import { FaStar } from "react-icons/fa6";
import { IoIosHeart } from "react-icons/io";
import { Link } from 'react-router-dom';
import { IoMdAddCircle } from "react-icons/io";
import { AuthContext } from '../Context/AuthContext'


const ProductDiscount = () => {

    const {

        data: productData,
        loading,
        error

    } = useFetch(`${BASE_URL}/product/productByDiscount`)


    const { user } = useContext(AuthContext);
          
          const handleAddToCart = async (e, productId) =>{
      
                          e.preventDefault();
              try {
      
                  if (!user || user === undefined || user === null) {
                      return alert('Please sign in')
                  }
    
                  const productToAdd = productData.find(item => item._id === productId);
    
                  if (!productToAdd) {
                    return alert('Product not found');
                  }
      
              const res = await fetch(`${BASE_URL}/cart/addtoCart/${productId}`,{
                  method: "POST",
                  headers: {
                    "content-type":"application/json",
                    "Authorization": `Bearer ${token}`
                  },
                  body: JSON.stringify({ productId,
                    price: productToAdd.price,
                    quantity: 1 })
              });
      
              console.log('token:', token)
      
              const result = await res.json();

              if(!res.ok){
  
                  console.error("Error adding to cart:", result.message);
                  return alert("Failed to add product to cart.");
              }
  
              alert('product added to cart');
              console.log(result.message);
      
          }catch(error){
      
              console.log(error.message);
          }
      
      }

    return (

        <div className='product'>
            <div className="container mt-5">
                <h3 className='mb-4 mt-5'>Big Discounts</h3>
                {loading && <h1>{<Loading />}</h1>}
                {error && <h1>Error</h1>}
                {
                    !loading && !error && (
                        <div className="container mt-5">
                            <div className="row">
                                {
                                    productData?.map((product) => (
                                        <div className="col-md-4 mb-4" key={product._id}>
                                            <Card style={{ width: '18rem' }}>
                                            <Link to={product._id}><Card.Img  src={product.imageurl} className='card-img-top img-fluid' /></Link>
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-6">
                                <div class="discount-text">{product.discount} % Off</div>
                                </div>
                                <div className="col-md-6 icon">
                                <IoIosHeart/>
                                </div>
                            </div>
                        </div>
                        <Card.Body>
                        <Link to={product._id} className='text-decoration-none text-dark'><Card.Title className='text-start'>{product.name}</Card.Title>
                        </Link>
                        <Card.Text className='text-start'><FaStar className='star'/>
                        <span><FaStar className='star'/></span>
                        <span><FaStar className='star'/></span>
                        <span><FaStar className='star'/></span>
                        <span><FaStar className='star'/></span>
                        </Card.Text>
                        <div className="col-md-12">
                        <div className="row">
                        <div className="col-md-6">
                        <Card.Text className='text-start fw-bold fs-5'>${product.price}</Card.Text>
                        </div>
                        <div className="col-md-6">
                        <Button className=" ms-5 fw-bold" onClick={(e)=>{handleAddToCart(e, product._id)}}> <IoMdAddCircle /> </Button>
                        </div>
                        </div>
                        </div>
                    </Card.Body>
                    </Card>
                                        </div>
                                    ))
                                }

                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default ProductDiscount