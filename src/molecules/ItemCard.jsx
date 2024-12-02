import React, { useState } from "react";
import addCart from '../assets/Items/add-cart.png'
import ProductRatings from "../atoms/ProductRatings";
import notFavourite from '../assets/Items/favourite1.png'
import favourite from '../assets/Items/favourite2.png'
import { useDispatch, useSelector } from 'react-redux'
import CartItemAddedAlert from "../atoms/alerts/CartItemAddedAlert";
import { selectCurrentLogUser, addItems } from "../feature/users/UserSlice";
import { useNavigate } from "react-router-dom";

function ItemCard({ product, imageUrl, name, price, quantity, description }) {

  const [isFavourite, setFavourite] = useState(false);
  const [isAdded, setAdded] = useState(false);
  const currentLogUser = useSelector(selectCurrentLogUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleCart = () => {
    if(currentLogUser === ""){
        navigate('/login');
    }else{
      dispatch(addItems(product));
      setAdded(true);
      setTimeout(() => { setAdded(false) }, 1500);
    }
  }

  return (
    <>
      <div>
        <div className="block rounded-lg p-3 shadow-sm shadow-indigo-100 mt-10 m-4 text-white">
          {/* product image */}
          <img
            alt=""
            src={imageUrl}
            className="h-96 w-full rounded-md object-cover"
          />

          <div className="mt-2">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <p className="font-semibold text-xl">Rs.{price}</p>
                <p className="mt-2">{name}</p>
                {
                  quantity > 0 ? <p className="mt-2 text-green-400">In Stock</p> :
                    <p className="mt-2 text-red-600">Out Of Stock</p>
                }
                <ProductRatings />
              </div>

            </div>
            <div className="flex justify-end my-3 gap-2">
              <button className="w-8" onClick={() => { setFavourite(!isFavourite) }}>
                {!isFavourite ? <img src={notFavourite} alt="isFavourite" /> :
                  <img src={favourite} alt="isFavourite" />}

              </button>

              {/* Add to cart button */}
              <button className="w-8 disabled:cursor-not-allowed" onClick={handleCart} disabled={!(quantity>0)}>
                <img src={addCart} alt="add to cart" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {isAdded ? <CartItemAddedAlert product={product} /> : null}
    </>
  );
}

export default ItemCard;
