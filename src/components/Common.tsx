import Navbar from './Navbar'
import Footer from './Footer'

const Common:React.FC<any> = ({children}) => {
  


  return (
    <>
      <Navbar/>
      {children}
      <Footer/>
    </>
  )
}

export default Common
