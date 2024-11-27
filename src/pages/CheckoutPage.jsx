import React, { useState } from 'react'
import NavigationBar from '../common/NavigationBar'
import { Radio, Label } from 'flowbite-react'
import { useForm } from 'react-hook-form';
import ShoppingDetailsForm from '../organisms/checkout/ShoppingDetailsForm'
import OrderSummeryTable from '../organisms/checkout/OrderSummeryTable'
import BankCards from '../atoms/icons/checkoutPage/BankCards'
import VirtualBankCard from '../molecules/checkoutPage/VirtualBankCard'
import CardDetails from '../organisms/checkout/CardDetails'
import TextFieldRegisterContext from '../context/checkoutPage/TextFieldRegisterContext';
import { CARD_PAYMENT, CASH_ON_DELIVERY } from '../types/paymentMethod'
import axios from 'axios';
import { ORDER_PROCESSING } from '../types/OrderStatusTypes';
import { useSelector, useDispatch } from 'react-redux';
import { setCartInitialValues } from '../feature/cart/cartSlice'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const totalPrice = useSelector(state => state.totalPrice);
  const cartItemsForOrders = useSelector(state => state.cartItemsForOrders);
  const [paymentMethod, setPaymentMethod] = useState(CARD_PAYMENT);

  const [isOrderPlaced, setOrderPlaceStatus] = useState(false);

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

  const handleSubmit = async () => {
    try {
      if (cartItemsForOrders.length === 0) {
        navigate('/');
      } else {
        const { fullName, address1, address2, postalCode } = shoppingDetails;
        if (fullName !== "" && address1 !== "" && postalCode !== "") {
          const order = {
            userName: fullName,
            date: Date.now(),
            total: totalPrice,
            discount: 0,
            status: ORDER_PROCESSING,
            paymentMethod: CASH_ON_DELIVERY,
            shippingMethod: "",
            shippingAddress1: address1,
            shippingAddress2: address2,
            postalCode: postalCode,
            isPaid: false
          }
          let form = new FormData();
          form.append("order", new Blob([JSON.stringify(order)], { type: 'application/json' }));
          form.append("products", new Blob([JSON.stringify(cartItemsForOrders)], { type: 'application/json' }));

          const response = await axios.post('http://localhost:8081/api/v1/order/add', form, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })

          orderSuccessAlert();
          dispatch(setCartInitialValues());
          navigate('/');
        } else {
          warningAlertForRequiredFields();
        }
      }
    } catch (e) {
      console.log(e);
      orderFailedAlert();
    }

  }

  const warningAlertForRequiredFields = () => {
    Swal.fire({
      title: "Shopping Details are required!",
      text: "Please fill your details!",
      icon: "warning"
    });
  }

  const orderSuccessAlert = () => {
    Swal.fire({
      title: "Successfully Placed an order!",
      text: "Thank you!",
      icon: "success"
    });
  }

  const orderFailedAlert = () => {
    Swal.fire({
      title: "Fail to Placed an order!",
      text: "Please try again!",
      icon: "error"
    });
  }


  return (
    <>
      <div>
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
              <Radio className='mr-3' id="COD" name="payment-methods" value="COD" defaultChecked onClick={() => setPaymentMethod(CASH_ON_DELIVERY)} />
              <Label className='text-white' htmlFor="COD">Cash On Delivery</Label>
            </div>
            <div className="flex-col">
              <Radio className='mr-3' id="card-payment" name="payment-methods" value="COD" defaultChecked onClick={() => setPaymentMethod(CARD_PAYMENT)} />
              <Label className='text-white' htmlFor="card-payment">Card Payment</Label>
            </div>
          </div>

          {paymentMethod == CARD_PAYMENT ? <div>
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
              <button className='bg-[#000814] text-white border-white ring-1 ring-[#0c353b] px-5 py-2 rounded-md border-double hover:bg-[#0c353b]'>Cancel</button>
            </div>
            <div className='flex-col'>
              <button className='bg-[#0c353b] text-white border-white ring-1 ring-[#0c353b] px-5 py-2 rounded-md border-double hover:bg-[#0a2225]' onClick={handleSubmit}>Confirm & Pay</button>
            </div>
          </div>

        </div>

      </div>
    </>
  )
}

export default CheckoutPage