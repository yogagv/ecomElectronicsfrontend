import React, { useContext, useState } from 'react'
import { BASE_URL, token } from '../utils/config'
import useFetch from '../hooks/useFetch'
import Loading from '../Loading/Loading'
import {  Button, Card } from 'react-bootstrap'
import { FaStar } from "react-icons/fa6";
import { IoIosHeart } from "react-icons/io";
import { Link, useParams } from 'react-router-dom'
import './newarrival.css'
import NewArrivalwireless from '../NewArrival_wireless/NewArrival_wireless'
import { AuthContext } from '../Context/AuthContext'



const NewArrival = () => {

    const {

        data: productData,
        loading,
        error

    } = useFetch(`${BASE_URL}/product/productByCategory/mobile`)

    const productCategory = productData.filter((_, index) => index !== 6);


    const [cart, setCart] = useState('');


    const { productId } = useParams();

    const { user } = useContext(AuthContext);
    
    const handleClick = async (e) =>{

        e.preventDefault();

        try {

            if (!user || user === undefined || user === null) {
                return alert('Please sign in')
            }

        const res = await fetch(`${BASE_URL}/cart/addtocart/${productId}`,{
            method: "POST",
            headers: {"content-type":"application/json"},
            Authorization: `Bearer ${token}`,
            body: JSON.stringify(setCart)
        });

        console.log('token:', token)

            const result = await res.json();

            if(!result.ok){

                console.log(result.message);
            }

            alert('product added to cart');

    }catch(error){

        console.log(error.message);
    }

}


  return (
    <div className='productmobile'>
            <div className="container mt-5">
                <h3 className='mb-4 mt-5'>New Arrival</h3>
                {loading && <h1> {<Loading />} </h1>}
                {error && <h1>Error</h1>}
                {
                    !loading && !error && (
                        <div className="container mt-5">
                            <div className="row">
                                {
                                    productCategory?.map((product) => (
                                        <div className="col-md-4 mb-4" key={product._id}>
                                            <Card style={{ width: '18rem' , background:"#FAFAFA"}}>
                        <Card.Img  src={product.imageurl} className='card-img-top img-fluid' style={{background:"#FAFAFA"}} />
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
                       <Link to={product._id}><Button className="cart_button ms-5 fw-bold" onClick={handleClick}> + </Button></Link>
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
                <NewArrivalwireless />
            </div>
        </div>
  )
}

export default NewArrival