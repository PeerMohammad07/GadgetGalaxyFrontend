import { useEffect, useState } from "react"
import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar"
import HomeLayout from "./ImageCarousel"
import ProductListing from "./ProductListing"
import { getAllProducts } from "../../Api/adminApi"

const Home = () => {
  const [products,setProducts] =  useState([])

  useEffect(()=>{
    const fetch = async ()=>{
      const response = await getAllProducts()
      setProducts(response.data)
    }
    fetch()
  },[])

  return (
    <>
      <Navbar/>
      <HomeLayout/>
      <ProductListing products={products}/>
      <Footer/>
    </>
  )
}

export default Home
