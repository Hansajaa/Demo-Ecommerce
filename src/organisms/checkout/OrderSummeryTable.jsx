import React from 'react'
import {useSelector} from 'react-redux'
import { AllCartItemsTotalPrice } from '../../feature/cart/CartSlice';

const OrderSummeryTable = () => {
    const totalPrice = useSelector(AllCartItemsTotalPrice);

    return (
        <>
            <div className='bg-[#000814] border-2  w-auto h-80 m-3 rounded-lg'>
                <h2 className='text-white text-center my-3 font-semibold'>Order Summary</h2>
                <hr className='mt-5' />

                <div className='grid place-items-center mt-8'>
                    <div className='grid-rows-1'>
                        <div className='grid grid-cols-2 gap-x-52'>
                            <div>
                                <p className='text-white'>Sub Total</p>
                            </div>
                            <div>
                                <p className='text-white'>Rs. {totalPrice}</p>
                            </div>
                        </div>
                    </div>

                    <div className='grid-rows-1 mt-3'>
                        <div className='grid grid-cols-2 gap-x-52'>
                            <div>
                                <p className='text-white'>Shipping</p>
                            </div>
                            <div>
                                <p className='text-white'>Free</p>
                            </div>
                        </div>
                    </div>

                    <div className='grid-rows-1 mt-3'>
                        <div className='grid grid-cols-2 gap-x-10'>
                            <div>
                                <p className='text-white ml-7 mt-3'>Coupen Code</p>
                            </div>
                            <div className='flex justify-end'>
                                <input type="text" placeholder='Coupen Code' className='flex bg-[#000814] w-full border-t-[#000814] border-l-[#000814] border-r-[#000814] text-white focus:outline-none focus:ring-0 focus:border-transparent focus:border-b-white' />
                            </div>
                        </div>
                    </div>

                    {/* <div className='grid-rows-1 mt-3'>
                        <div className='grid grid-cols-2 gap-x-52'>
                            <div>
                                <p className='text-white'>Tax</p>
                            </div>
                            <div>
                                <p className='text-white'>10%</p>
                            </div>
                        </div>
                    </div> */}
                </div>

                <hr className='mt-5' />

                <div className='grid place-items-center'>
                    <div className='grid-rows-1 mt-6'>
                        <div className='grid grid-cols-2 gap-x-48'>
                            <div>
                                <p className='text-white font-bold'>Total</p>
                            </div>
                            <div>
                                <p className='text-white font-bold'>Rs. {totalPrice}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderSummeryTable