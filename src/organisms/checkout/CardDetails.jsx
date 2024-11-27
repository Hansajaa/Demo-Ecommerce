import React from 'react'
import TextField from '../../atoms/textFields/checkout/TextField'

const CardDetails = () => {
    return (
        <>
            <div className="flex-col mt-5 md:-mt-5">
                <div>
                    <TextField id="" type="text" placeholder="Name" required />
                    <TextField id="" type="text" placeholder="Card Number" required />
                    <TextField id="" type="date" placeholder="ExpireDate" required />
                    <TextField id="" type="text" placeholder="CVV" required />
                </div>
            </div>
        </>
    )
}

export default CardDetails