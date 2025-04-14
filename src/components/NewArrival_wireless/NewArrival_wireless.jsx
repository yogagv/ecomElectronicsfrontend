import React, { useContext } from 'react'
import { BASE_URL, token } from '../utils/config'
import useFetch from '../hooks/useFetch'
import Loading from '../Loading/Loading'
import {  Button, Card } from 'react-bootstrap'
import { FaStar } from "react-icons/fa6";
import { IoIosHeart } from "react-icons/io";
import { Link } from 'react-router-dom'
import './newarrival_wireless.css'
import { AuthContext } from '../Context/AuthContext'

const NewArrival_wireless = () => {

    const {

        data: productData,
        loading,
        error

    } = useFetch(`${BASE_URL}/product/productByCategory/wireless`)

    const { user } = useContext(AuthContext);

    const handleAddToCart = async(e, productId) => {

        e.preventDefault();

            try {

                if(!user ||  user === undefined || user === null){

                    return alert("Please login to add product to cart");
                }

                const productToAdd = productData.find(item => item._id === productId);
    
                  if (!productToAdd) {
                    return alert('Product not found');
                  }


                const res = await fetch(`${BASE_URL}/cart/addtocart/${productId}`, {
                    method: 'POST',
                    headers: {
                        "content-type":"application/json",
                        "Authorization": `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        productId,
                        price: productToAdd.price,
                        quantity: 1
                    })
                })

            const result = await res.json();

            if(!res.ok){

                console.error("Error adding to cart:", result.message);
                return alert("Failed to add product to cart.");
            }

            alert('product added to cart');
            console.log(result.message);

            
            }catch(error) {

                console.log(error.message);
                alert("Something went wrong");
                
            }

    }

  return (

    <div className='productwireless'>
            <div className="container mt-5">
                <h3 className='mb-4 mt-5'>New Arrival Wireless</h3>
                {loading && <h1>{<Loading />}</h1>}
                {error && <h1>Error</h1>}
                {
                    !loading && !error && (
                        <div className="container mt-5">
                            <div className="row">
                                {
                                    productData?.map((product, index) => (
                                        <div className="col-md-4 mb-4" key={product._id} style={{
                                            marginLeft: index === 3 ? 'auto' : '',
                                            marginRight: index === 3 ? 'auto' : '',
                                          }} >
                                            <Card style={{ width: '18rem', background:"#FAFAFA" }}>
                      <Link to={product._id}><Card.Img  src={product.imageurl} className='card-img-top img-fluid' style={{background:"#FAFAFA"}}/>
                      </Link>
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-6">
                               
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
                        <Button className="cart_button ms-5 fw-bold" onClick={(e)=>{handleAddToCart(e, product._id)}}> + </Button>
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

export default NewArrival_wireless