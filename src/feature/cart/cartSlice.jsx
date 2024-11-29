import {createSlice} from '@reduxjs/toolkit'
import {CART_ITEM_QTY_DECREMENT, CART_ITEM_QTY_INCREMENT} from '../../types/cartQtyType'

const initialState = {
    cartItems : [],
    cartItemCount: 0,
    totalPrice:0,
    cartItemsForOrders : []
}

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addItems: (state, action) => {
            let isExists = false;
            const newItem = action.payload;
            state.cartItems = state.cartItems.map(item => {
                if(item.productID === newItem.productID){
                    state.cartItemsForOrders = state.cartItemsForOrders.map(cartItem=>{
                        if(cartItem.productID === newItem.productID){
                            cartItem.cartQty ++;
                        }
                        return cartItem;
                    })
                    item.cartQty ++;
                    item.cartPrice =  item.cartQty * item.price;
                    state.totalPrice += item.price;
                    isExists = true;
                }
                return item;    
            })
            if(!isExists){
                state.cartItemsForOrders.push({...newItem, cartQty:1});
                state.cartItems.push({...newItem, cartQty:1, cartPrice: newItem.price});
                state.totalPrice+=newItem.price;
                state.cartItemCount++;
            }
        },
        deleteItem: (state, action)=>{
            state.cartItems.map(item => {
                if(item.productID === action.payload.productID){
                    state.totalPrice-=item.price*item.cartQty;
                }
                return item;
            })
            state.cartItemsForOrders = state.cartItemsForOrders.filter(cartItem => cartItem.productID !== action.payload.productID);
            state.cartItems = state.cartItems.filter(item => item.productID !== action.payload.productID);
            state.cartItemCount--;
        },
        itemQtyHandler: (state, action)=>{
            state.cartItems = state.cartItems.map((item)=>{
                if(action.payload.productID === item.productID){
                    if(action.payload.type === CART_ITEM_QTY_INCREMENT){
                        item.cartQty ++;
                        item.cartPrice = item.cartQty * item.price;
                        state.totalPrice+=item.price;
                    }
                    if(action.payload.type === CART_ITEM_QTY_DECREMENT){
                        item.cartQty --;
                        item.cartPrice = item.cartQty * item.price;
                        state.totalPrice-=item.price;
                    }
                }
                return item;
            })

            state.cartItemsForOrders = state.cartItemsForOrders.map((cartItem)=>{
                if(action.payload.productID === cartItem.productID){
                    if(action.payload.type === CART_ITEM_QTY_INCREMENT){
                        cartItem.cartQty ++;
                    }
                    if(action.payload.type === CART_ITEM_QTY_DECREMENT){
                        cartItem.cartQty --;
                    }
                }
                return cartItem;
            })
            
        },
        setCartInitialValues: (state, action)=>{
            state.cartItems = [];
            state.totalPrice = 0;
            state.cartItemCount = 0;
            state.cartItemsForOrders = [];
        }
    }
})

export const {addItems, itemQtyHandler, deleteItem, setCartInitialValues} = cartSlice.actions;

export default cartSlice.reducer;