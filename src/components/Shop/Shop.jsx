// import React, { useEffect, useState } from 'react'
// import productcover from '../../assets/images/table.jpg';
// import './shop.css'
// import { BASE_URL } from '../utils/config';

// const Shop = () => {

//   const [product, setProduct] = useState([]);
//   const [category, setCategory] = useState('all');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleClick = (e) => {
//     setCategory(e.target.value); 
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, [category]);

//   const fetchProducts = async () => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       const result = category === 'all' 
//         ? `${BASE_URL}/product/allProduct` 
//         : `${BASE_URL}/product/productByCategory/${category}`;

//       const res = await fetch(result);
//       const resProducts = await res.json();
//       setProduct(resProducts);
//       // console.log("Fetched Products:", resProducts); // Debugging
//     } 
    
//     catch (error) {
//       console.error(error.message);
//     }

//   };

//   return (
//     <>
//       <div className="img">
//         <img src={productcover} alt="Shop" className='shop'/>
//         <h3 className='text-light text-center fw-bold fs-2'>Product</h3>
//       </div>

//       <div className="container mt-5">
//         <div className="row">
//           <div className="d-flex mt-5 align-items-center">
//             <label className="me-2">Filter by Category:</label>
//             <select 
//               value={category} 
//               className="selection form-select" 
//               onChange={handleClick}
//             >
//               <option value="all">All Products</option>
//               <option value="sofa">Sofa</option>
//               <option value="chair">Chair</option>
//               <option value="mobile">Mobile</option>
//               <option value="wireless">Wireless</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       <div className="container mt-5">
//         {loading && <h1>Loading...</h1>}
//         {error && <h1 className="text-danger">{error}</h1>}
//         {!loading && !error && (
//           <div className="row">
//             {product.length > 0 ? (
//               product.map((prod) => (
//                 <div className="col-md-4 mb-4" key={prod._id}>
//                   <div className="card">
//                     <img
//                       src={prod.image}
//                       alt={prod.name}
//                       className="card-img-top img-fluid"
//                     />
//                     <div className="card-body">
//                       <h5 className="card-title">{prod.name}</h5>
//                       <p className="card-text">{prod.description}</p>
//                       <p className="card-text">Price: ${prod.price}</p>
//                       <p className="card-text">Category: {prod.category}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <h3 className="text-center">No Data Found!</h3>
//             )}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Shop;


import React, { useContext, useEffect, useState } from 'react';
import productcover from '../../assets/images/table.jpg';
import './shop.css';
import { BASE_URL, token } from '../utils/config';
import { Button, Card } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { IoIosHeart,  } from 'react-icons/io';
import { AuthContext } from '../Context/AuthContext';


const Shop = () => {
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        let url;
        // Log the current category to debug
        console.log("Current category:", category);
        
        if (category === 'all') {
          // You might need to adjust this endpoint based on your actual API
          url = `${BASE_URL}/product/allProduct`;
          console.log("Fetching all products from:", url);
        } else {
          url = `${BASE_URL}/product/productByCategory/${category}`;
          console.log("Fetching category products from:", url);
        }
        
        const res = await fetch(url);
        console.log("Response status:", res.status);
        
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        
        const resProducts = await res.json();
        console.log("Products received:", resProducts);
        
        // Check if the response has the expected structure
        if (Array.isArray(resProducts)) {
          setProduct(resProducts);
        } else if (resProducts.data && Array.isArray(resProducts.data)) {
          // Some APIs wrap the data in a data property
          setProduct(resProducts.data);
        } else {
          console.error("Unexpected response format:", resProducts);
          setError("Received unexpected data format from server");
          setProduct([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error.message);
        setProduct([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [category]);

  
      const { user } = useContext(AuthContext);
      
      const handleAddToCart = async (e, productId) =>{
  
                      e.preventDefault();
          try {
  
              if (!user || user === undefined || user === null) {
                  return alert('Please sign in')
              }

              if (!user.role === "user") {

                return alert('You are not authorized')
              }

              const productToAdd = product.find(item => item._id === productId);

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
  
              if(!result.ok){
  
                  console.log(result.message);
              }
  
              alert('product added to cart');
  
      }catch(error){
  
          console.log(error.message);
      }
  
  }

  // Function to handle category change
  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    console.log("Category changed to:", newCategory);
    setCategory(newCategory);
  };

  return (
    <div className='product'>
      {/* Hero Section */}
      <div className="img">
        <img src={productcover} alt="" className="shop" />
        <h3 className="text-light text-center fw-bold fs-2">Product</h3>
      </div>

      {/* Filter Section */}
      <div className="container mt-5">
        <div className="row">
          <div className="d-flex mt-5 align-items-center">
            <label className="me-2">Filter by Category:</label>
            <select
              value={category}
              className="selection form-select"
              onChange={handleCategoryChange}
              id="category"
            >
              <option value="all">All Products</option>
              <option value="sofa">Sofa</option>
              <option value="chair">Chair</option>
              <option value="mobile">Mobile</option>
              <option value="wireless">Wireless</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Listing */}
      <div className="container mt-5 product">
        {loading ? (
          <div className="text-center">
            <p>Loading products...</p>
          </div>
        ) : error ? (
          <div className="alert alert-danger">
            Error: {error}. Please try again later.
          </div>
        ) : product && product.length > 0 ? (
          <div className="row">
            {product.map((product) => (
                                                 <div className="col-md-4 mb-4" key={product._id}>
                                                 <Card style={{ width: '18rem' }}>
                                                 <Link to={product._id}><Card.Img  src={product.imageurl} className='card-img-top img-fluid' /></Link>
                             <div className="col-md-12">
                                 <div className="row">
                                     <div className="col-md-6">
                                     <div className="discount-text">{product.discount} % Off</div>
                                     </div>
                                     <div className="col-md-6 icon">
                                     <IoIosHeart/>
                                     </div>
                                 </div>
                             </div>
                             <Card.Body>
                             <Link to={`/product/${product._id}`} className='text-decoration-none text-dark'><Card.Title className='text-start'>{product.name}</Card.Title>
                             </Link>
                             <Card.Text className='text-start'><FaStar className='star'/>
                             <span><FaStar className='star'/></span>
                             <span><FaStar className='star'/></span>
                             <span><FaStar className='star'/></span>
                             <span><FaStar className='star'/></span>
                             </Card.Text>
                             {/* <div className='col-md-12 '>
                                {product.description}
                             </div> */}
                             <div className="col-md-12">
                             <div className="row">
                             <div className="col-md-6">
                             <Card.Text className='text-start fw-bold fs-5'>${product.price}</Card.Text>
                             </div>
                             <div className="col-md-6">
                            <Button className="cart_button ms-5 fw-bold" onClick={(e) => handleAddToCart(e, product._id)}> + </Button>
                             </div>
                             </div>
                             </div>
                         </Card.Body>
                         </Card>
                                             </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <h3>No products found for this category</h3>
            <p>Try selecting a different category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
