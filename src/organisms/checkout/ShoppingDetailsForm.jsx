import React from 'react'
import TextField from '../../atoms/textFields/checkout/TextField'

const ShoppingDetailsForm = () => {
    return (
        <>
            <div className='m-3'>
                <h2 className='text-white font-semibold'>Shopping Details</h2>

                <div className='mt-9'>
                    <TextField name="fullName" type="text" placeholder="Full Name" required />
                    <TextField name="address1" type="text" placeholder="Shipping Address Line 1" required />
                    <TextField name="address2" type="text" placeholder="Shipping Address Line 2" required />
                    <TextField name="postalCode" type="text" placeholder="Postal Code" required />
                </div>
            </div>
        </>
    )
}

export default ShoppingDetailsForm