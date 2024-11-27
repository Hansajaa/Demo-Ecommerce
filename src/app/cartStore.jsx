import {configureStore} from '@reduxjs/toolkit'
import cartReducer from '../feature/cart/cartSlice'


export const cartStore = configureStore({
    reducer: cartReducer
})