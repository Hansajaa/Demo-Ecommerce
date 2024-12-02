import React from 'react'
import notFoundAnimationData from '../assets/404-animation.json'
import Lottie from 'lottie-react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className='flex flex-col mt-28'>
        <div className='flex items-center justify-center'>
            <Lottie animationData={notFoundAnimationData} style={{ height: 250, width: 250 }}></Lottie>
        </div>
        <h1 className='flex items-center justify-center text-[#15616D] mt-16 font-semibold text-2xl font-mono'>Lost ?</h1>
        <Link to={'/'} className='flex items-center justify-center text-[#15616D] mt-5 font-semibold text-2xl font-mono'>Lets back to shopping</Link>
    </div>
  )
}

export default NotFoundPage