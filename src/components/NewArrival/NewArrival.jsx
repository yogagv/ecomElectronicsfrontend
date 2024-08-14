import React from 'react'
import { BASE_URL } from '../utils/config'
import useFetch from '../hooks/useFetch'
import Loading from '../Loading/Loading'
import {  Button, Card } from 'react-bootstrap'
import { FaStar } from "react-icons/fa6";
import { IoIosHeart } from "react-icons/io";
import { Link } from 'react-router-dom'
import './newarrival.css'
import NewArrival_wireless from '../NewArrival_wireless/NewArrival_wireless'

const NewArrival = () => {

    const {

        data: productData,
        loading,
        error

    } = useFetch(`${BASE_URL}/product/productByCategory/mobile`)

    const productCategory = productData.filter((_, index) => index !== 6);

  return (
    <div className='productmobile'>
            <div className="container mt-5">
                <h3 className='mb-4 mt-5'>New Arrival</h3>
                {loading && <h1>{<Loading />}</h1>}
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
                        <Button className="cart_button ms-5 fw-bold"> + </Button>
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
                <NewArrival_wireless />
            </div>
        </div>
  )
}

export default NewArrival