import React from 'react'
import animationData from '../../assets/Items/item_not_found_animation.json'
import Lottie from 'lottie-react'

const ItemsNotFoundAnimation = () => {
  return (
    <div className='flex flex-col'>
        <div className='flex items-center justify-center'>
            <Lottie animationData={animationData} style={{ height: 600, width: 600 }}></Lottie>
        </div>
        <h1 className='flex items-center justify-center text-[#15616D] mb-32 -mt-16 font-semibold text-2xl font-mono'>Items Not Found</h1>
    </div>
  )
}

export default ItemsNotFoundAnimation

