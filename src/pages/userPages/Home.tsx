import { useEffect, useState } from "react"
import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar"
import HomeLayout from "./ImageCarousel"
import ProductListing from "./ProductListing"
import { getAllProducts } from "../../Api/adminApi"
import { getAllCartItems } from "../../Api/userApi"
import { RootState } from "../../Redux/store"
import { useSelector } from "react-redux"

const Home = () => {
  const userData = useSelector((state: RootState) => state.user.userData);
  const [products, setProducts] = useState([])
  const [cartItems, setCartItems] = useState<any[] | []>([])

  console.log(products)

  useEffect(() => {
    const fetch = async () => {
      const response = await getAllCartItems(userData?._id)
      setCartItems(response.data.products)
    }
    fetch()
  }, [])

  useEffect(() => {
    const fetch = async () => {
      const response = await getAllProducts()
      setProducts(response.data)
    }
    fetch()
  }, [])

  const addCartItems = (value: any) => {
    setCartItems((prevState) => [...prevState, value]);
  };

  return (
    <>
      <Navbar count={cartItems.length} />
      <HomeLayout />
      <ProductListing products={products} addCartItems={addCartItems} />
      <Footer />
    </>
  )
}

export default Home
