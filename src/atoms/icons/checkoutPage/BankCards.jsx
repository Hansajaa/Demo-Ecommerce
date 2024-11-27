import React from 'react'
import visaCardsImg from '../../../assets/checkout_page/visacards_img.png'
import masterCardsImg from '../../../assets/checkout_page/mastercards_img.png'
import americanExpressCardsImg from '../../../assets/checkout_page/american-express_img.png'

const BankCards = () => {
  return (
    <>
        <div className='flex flex-row gap-x-10 mt-5'>
            <div className="flex-col">
              <img src={visaCardsImg} alt="visa cards" className='w-10' />
            </div>
            <div className="flex-col">
              <img src={masterCardsImg} alt="Master cards" className='w-10' />
            </div>
            <div className="flex-col">
              <img src={americanExpressCardsImg} alt="American Express cards" className='w-10' />
            </div>
          </div>
    </>
  )
}

export default BankCards