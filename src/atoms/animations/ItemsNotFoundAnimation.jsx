import React from 'react'
import animationData from '../../assets/Items/item_not_found_animation.json'
import Lottie from 'lottie-react'

const ItemsNotFoundAnimation = () => {
  return (
    <div className='flex items-center justify-center w-auto'>
      <Lottie animationData={animationData} style={{ height: 400, width: 400 }}></Lottie>
    </div>
  )
}

export default ItemsNotFoundAnimation

