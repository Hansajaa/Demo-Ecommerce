import animationData from '../../assets/cart_page/cart-page-animation.json'
import Lottie from 'lottie-react'

const CartPageAnimation = () => {
  return (
    <div className='flex items-center justify-center'>
        <Lottie animationData={animationData} style={{ height: 400, width: 400 }}></Lottie>
    </div>
  )
}

export default CartPageAnimation