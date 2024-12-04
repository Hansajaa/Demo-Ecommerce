import React, { useEffect, useState } from 'react'
import NavigationBar from '../common/NavigationBar'
import { Radio, Label } from 'flowbite-react'
import ShoppingDetailsForm from '../organisms/checkout/ShoppingDetailsForm'
import OrderSummeryTable from '../organisms/checkout/OrderSummeryTable'
import BankCards from '../atoms/icons/checkoutPage/BankCards'
import VirtualBankCard from '../molecules/checkoutPage/VirtualBankCard'
import CardDetails from '../organisms/checkout/CardDetails'
import TextFieldRegisterContext from '../context/checkoutPage/TextFieldRegisterContext';
import { CARD_PAYMENT, CASH_ON_DELIVERY } from '../types/paymentMethod'
import { Link } from 'react-router-dom'
import { selectCurrentLogUser } from '../feature/users/UserSlice'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const CheckoutPage = () => {

  const navigate = useNavigate();
  const currentLogUser = useSelector(selectCurrentLogUser);
  const [paymentMethod, setPaymentMethod] = useState(CASH_ON_DELIVERY);

  const shoppingFields = {
    fullName: "",
    address1: "",
    address2: "",
    postalCode: ""
  }

  const [shoppingDetails, setShoppingDetails] = useState(shoppingFields);

  const handleInputChange = (field, value) => {
    setShoppingDetails((prevData) => ({
      ...prevData,
      [field]: value
    }))
  }

  useEffect(() => {
    if (currentLogUser == "") {
      navigate('/');
    }

    if (currentLogUser && (currentLogUser.cartItems.length == 0)) {
      navigate('/');
    }
  }, [])

  return (
    <>
      {currentLogUser && currentLogUser.cartItems.length > 0 ? <div>
        <NavigationBar></NavigationBar>

        <div className='grid grid-cols-1 md:grid-cols-2 gap4'>
          {/* Col-1 */}
          <TextFieldRegisterContext.Provider value={handleInputChange}>
            <ShoppingDetailsForm />
          </TextFieldRegisterContext.Provider >

          {/* Col-2 */}
          <OrderSummeryTable></OrderSummeryTable>
        </div>

        {/* Payment Details Section */}
        <div className='m-3'>
          <h2 className='font-semibold text-white'>Payment Details</h2>

          {/* Select Payment Method */}
          <div className='flex flex-row gap-x-10 mt-10'>
            <div className="flex-col">
              <Radio className='mr-3' id="COD" name="payment-methods" value="COD" defaultChecked={true} onClick={() => setPaymentMethod(CASH_ON_DELIVERY)} />
              <Label className='text-white' htmlFor="COD">Cash On Delivery</Label>
            </div>
            <div className="flex-col">
              <Radio disabled={true} className='mr-3 disabled:cursor-not-allowed' id="card-payment" name="payment-methods" value="COD" onClick={() => setPaymentMethod(CARD_PAYMENT)} />
              <Label className='text-white' htmlFor="card-payment">Card Payment</Label>
            </div>
          </div>

          {paymentMethod === CARD_PAYMENT ? <div>
            {/* Card Brands */}
            <BankCards></BankCards>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-x-56">

              {/* VirtualCard */}
              <div>
                <VirtualBankCard></VirtualBankCard>
              </div>

              {/* Card Details */}
              <CardDetails></CardDetails>
            </div>
          </div> : null}

          {/* Cancel and Place Order Button */}
          <div className='flex flex-row gap-x-10 place-self-end mt-5 justify-end'>
            <div className='flex-col'>
              <Link to={'/'} className='bg-[#000814] text-white border-white ring-1 ring-[#0c353b] px-5 py-2 rounded-md border-double hover:bg-[#0c353b]' >Cancel</Link>
            </div>
            <div className='flex-col'>
              <button className='bg-[#0c353b] text-white border-white ring-1 ring-[#0c353b] px-5 py-2 rounded-md border-double hover:bg-[#0a2225] -translate-y-2 disabled:cursor-not-allowed' disabled={true}>Confirm & Pay</button>
            </div>
          </div>

        </div>

      </div> : null}
    </>
  )
}

export default CheckoutPage