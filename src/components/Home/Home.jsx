import React from 'react'
import Hero from '../Hero/Hero'
import Features from '../Features/Features'
import ProductDiscount from '../ProductDiscount/ProductDiscount'
import NewArrival from '../NewArrival/NewArrival'
import BestSales from '../BestSales/BestSales'

const Home = () => {
  return (
    <div>
        <Hero />
        <Features />
        <ProductDiscount />
        <NewArrival />
        <BestSales />
    </div>
  )
}

export default Home