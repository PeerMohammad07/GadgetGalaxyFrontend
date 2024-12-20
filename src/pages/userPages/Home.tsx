import { useEffect, useState } from "react"
import HomeLayout from "./ImageCarousel"
import ProductListing from "./ProductListing"
import { getAllProducts } from "../../Api/adminApi"

const Home = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetch = async () => {
      const response = await getAllProducts()
      console.log(response.data)
      setProducts(response.data)
    }
    fetch()
  }, [])
  
  return (
    <>
      <HomeLayout />
      <ProductListing products={products} />
    </>
  )
}

export default Home
