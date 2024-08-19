import React, { useState } from 'react'
import useFetch from '../hooks/useFetch'
import { BASE_URL } from '../utils/config'
import { useParams } from 'react-router-dom'
import productcover from '../../assets/images/table.jpg';
import './singleproduct.css'
import { FaStar } from 'react-icons/fa6';
import Cart from '../Cart/Cart';

const SingleProduct = () => {

    const [addtocart, setAddtoCart] = useState('1')

    const { id } =useParams();

    const {data: productData,
           loading,
           error
    } = useFetch(`${BASE_URL}/product/singleProduct/${id}`);

    const handleClick = (e) => {

        setAddtoCart((prev)=>({...prev, [e.target.id]: e.target.value }))
    }

    const handleSubmit = (e) => {

        e.preventDefault();
        
    }

  return (
    <div>
        <div className="imgData">
            <img src={productcover} alt="" className='shop'/>
            <h3 className='text-light text-center fw-bold fs-2'>{productData.name}</h3>
        </div>
        {loading && <h1>Loading</h1>}
        {error && <h1>Error</h1>}
        {
           !loading && !error && (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 imagecard mt-5">
                    <img src={productData.imageurl} alt="" />
                    </div>
                    <div className="col-md-6 mt-5">
                        <h3>{productData.name}</h3>
                        <div className="text-start starrating">
                        <span><FaStar className='star'/></span>
                        <span><FaStar className='star'/></span>
                        <span><FaStar className='star'/></span>
                        <span><FaStar className='star'/></span>
                        <span><FaStar className='star'/></span>
                        </div>
                        <div className="d-flex mt-3">
                        <h4 className='price'>$ {productData.price}</h4>
                        <p className='category'>Category: {productData.category}</p>
                        </div>
                        <p className='p_description'>{productData.description}</p>
                        <form onSubmit={handleSubmit}>
                            <input type="number" id='cart' className='carttext' onClick={handleClick}/>
                            <br />
                            <button className='mt-2'>Add to Cart</button>
                        </form>
                </div>
                </div>
                </div>
           )
        }
    </div>
  )
}

export default SingleProduct