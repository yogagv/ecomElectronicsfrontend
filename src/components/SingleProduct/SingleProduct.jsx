import React, { useContext, useState } from 'react'
import useFetch from '../hooks/useFetch'
import { BASE_URL, token } from '../utils/config'
import { useParams } from 'react-router-dom'
import productcover from '../../assets/images/table.jpg';
import './singleproduct.css'
import { FaStar } from 'react-icons/fa6';
import { AuthContext } from '../Context/AuthContext';


const SingleProduct = () => {

    const [addtocart, setAddtoCart] = useState('1')

    const { id } =useParams();
    
    const { user } = useContext(AuthContext);

    const {data: productData,
           loading,
           error
    } = useFetch(`${BASE_URL}/product/singleProduct/${id}`);


    console.log(productData.name);
    

    const handleChange = (e) => {

        const value = e.target.value
        if (!isNaN(value) && value > 0) {
            setAddtoCart(value);
        } else {
            setAddtoCart(1);
        }
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

                try {
        
                    if (!user || user === undefined || user === null) {
                        return alert('Please sign in')
                    }
        
                const res = await fetch(`${BASE_URL}/cart/addtoCart/${id}`,
                    {
                    method: "POST",
                    headers: {
                        "content-type":"application/json",
                         "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({ quantity: parseInt(addtocart) })
                });
        
                console.log('token:')

                console.log("Product ID:", id);
        
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
                            <input type="number" id='cart' className='carttext' onChange={handleChange} value={addtocart}/>
                         <br />
                         <button className='mt-2 cartbutton'>Add to Cart</button>
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