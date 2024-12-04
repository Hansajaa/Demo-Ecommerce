import Lottie from 'lottie-react'
import React from 'react'
import NotMatchAnimationData from '../../assets/Items/item-not-match.json'

const ItemsNotMatchAnimation = () => {
  return (
    <div>
        <Lottie animationData={NotMatchAnimationData} style={{height:550}}></Lottie>
    </div>
  )
}

export default ItemsNotMatchAnimation