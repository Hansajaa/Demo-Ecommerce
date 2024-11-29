import {configureStore} from '@reduxjs/toolkit'
import cartReducer from '../feature/cart/CartSlice'
import UserReducer from '../feature/users/UserSlice'

export const Store = configureStore({
    reducer: {
        cart: cartReducer,
        users: UserReducer
    }
})