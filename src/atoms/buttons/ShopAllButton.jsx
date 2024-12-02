import React from 'react'
import arrowImg from '../../assets/Items/right-arrow.png'
import { useNavigate } from 'react-router-dom'


const ShopAllButton = ({shopAllPage}) => {

    const navigate = useNavigate();

    const handleClick = (navigationPath) => {
        navigate(navigationPath);
    }

    return (
        <div className='flex justify-end -translate-x-16'>
            <button className='bg-[#000814] border-2 border-[#15616D] py-2 px-6 rounded-full hover:scale-105 duration-500 translate-y-28 text-[#15616D] font-semibold flex items-center' onClick={()=> handleClick(shopAllPage)}>Shop All <img className='ml-2' src={arrowImg} alt="" /></button>
        </div>
    )
}

export default ShopAllButton