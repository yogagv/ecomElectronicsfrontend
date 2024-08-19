import React, { useState } from 'react'
import productcover from '../../assets/images/table.jpg';
import './shop.css'
import { BASE_URL } from '../utils/config';
import { Button, Card } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa6';
import { IoIosHeart } from 'react-icons/io';

const Shop = () => {

  const [filter, setFilter] = useState('sofa');
  const [product, setProduct] = useState([]);


  const handleClick = (e) => {

    setFilter((prev) => ({...prev, [e.target.name] : e.target.value }))

  }

  const handleSubmit = async (e) => {

    e.preventDefault();

      const res = await fetch(`${BASE_URL}/productByCategory/${category}`);
      const result = await res.json();
      const data = setProduct(result);
      console.log(data);      

  }


  return (
    <div>
      <div className="img">
            <img src={productcover} alt="" className='shop'/>
            <h3 className='text-light text-center fw-bold fs-2'>Product</h3>
        </div>
        <div className="container mt-5">
          <div className="row">
            <div className="d-flex mt-5">
              <select name="Category" className='selection' onSubmit={handleSubmit}  id="category">
                <option value='sofa'  > Filter By Category <span className='linestrip'> | </span></option>
                <option value='sofa'> Sofa </option>
                <option value='chair' > Chair </option>
                <option value='mobile'> Mobile </option>
                <option value='wireless'> Wireless </option>
              </select>
              <form onSubmit={handleSubmit} className='box h-25'>
                <input type="text" placeholder='search...' onClick={handleClick}/>
              </form>
            </div>
          </div>
        </div>
        {
          product && product.length ? (<>

            {
                    product?.map((product) => (
                    <div className="col-md-4 mb-4" key={product._id}>
                      <Card style={{ width: '18rem' }}>
                        <Card.Img  src={product.imageurl} className='card-img-top img-fluid' />
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
                        <Link to={product._id} className='text-decoration-none text-dark'><Card.Title className='text-start'>
                          {product.name}</Card.Title>
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
          </>) : (<>
          <h3>No Data Found!</h3>
          </>)
        }
    </div>
  )
}

export default Shop