import React from 'react'

const VirtualBankCard = () => {
    return (
        <>
            <div className='w-96 h-52 bg-white opacity-40 rounded-lg mt-5'>
                <div className='grid grid-cols-2'>
                    <div className='col-span-2 mt-14 ml-10'>
                        <p className='text-xs'>Card Number</p>
                        <p className='text-md'>XXXX XXXX XXXX XXXX</p>
                    </div>
                    <div className='ml-10 mt-5'>
                        <p className='text-xs'>Card Name</p>
                        <p className='text-md'>Nilana Hansaja</p>
                    </div>
                    <div className='mt-5 ml-10'>
                        <p className='text-xs'>Expire Date</p>
                        <p className='text-md'>12/24</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VirtualBankCard