import {Alert} from 'flowbite-react'

const CartItemAddedAlert = ({product}) => {
  return (
    <Alert color="info">
      <span className="font-medium">Info alert!</span> <span>{product.name} is Added to the Cart.</span>
    </Alert>
  )
}

export default CartItemAddedAlert