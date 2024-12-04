import { createSlice, nanoid } from "@reduxjs/toolkit";
import {CART_ITEM_QTY_DECREMENT, CART_ITEM_QTY_INCREMENT} from '../../types/cartQtyType'

// initialize the state
const initialState = {
    registeredUsers: [], 
    currentLogUser: ""
}

// create the redux slice
const userSlice = createSlice({

    //slice name
    name: "users",

    //slice initial state
    initialState,

    //slice methods/ reducers
    reducers: {

        // New user register
        registerNewUser : (state, action) => {
            state.registeredUsers.push({id: nanoid(), ...action.payload, cartItems : [], totalPrice : 0});
        },

        // User initialized when user log
        setCurrentLoginUser : (state, action) => {
            state.currentLogUser = action.payload;
        },

        // Items add to the cart by user
        addItems: (state, action) => {
            let isExists = false;
            const newItem = action.payload;

            // increment quantity and price when item is exists in the cart
            state.registeredUsers = state.registeredUsers.map(registeredUser => {
                if(registeredUser.id === state.currentLogUser.id){
                    registeredUser.cartItems = registeredUser.cartItems.map(item => {
                        if(item.productID === newItem.productID){
                            item.cartQty ++;
                            item.cartPrice =  item.cartQty * item.price;
                            registeredUser.totalPrice+=newItem.price;

                            isExists = true;
                        }
                        return item;    
                    })

                }
                return registeredUser;
            })

            // increment quantity and price when item is exists in the cart of current user
            state.currentLogUser.cartItems = state.currentLogUser.cartItems.map(item => {
                if(item.productID === newItem.productID){
                    item.cartQty ++;
                    item.cartPrice =  item.cartQty * item.price;
                    state.currentLogUser.totalPrice += item.price;
                }
                return item;    
            })

            // Add item as a new item when it not exists in the cart
            if(!isExists){
                state.registeredUsers = state.registeredUsers.map(registeredUser => {
                    if(registeredUser.id == state.currentLogUser.id){
                        registeredUser.cartItems.push({...newItem, cartQty:1, cartPrice: newItem.price});
                        registeredUser.totalPrice+=newItem.price;
                    }
                    return registeredUser;
                })

                state.currentLogUser.cartItems.push({...newItem, cartQty:1, cartPrice: newItem.price});
                state.currentLogUser.totalPrice+=newItem.price;
            }
        },

        //delete item in cart by user
        deleteItem: (state, action)=>{

            //remove item from registered user state
            state.registeredUsers = state.registeredUsers.map(registeredUser => {
                if(registeredUser.id === state.currentLogUser.id){
                    registeredUser.cartItems = registeredUser.cartItems.filter(item=>{
                        if(item.productID == action.payload.productID){
                            registeredUser.totalPrice-=item.cartPrice;
                        }

                        return item.productID != action.payload.productID;
                    })
                }
                return registeredUser;
            })

            //remove item from current log user state
            state.currentLogUser.cartItems = state.currentLogUser.cartItems.filter((item)=>{
                if(item.productID == action.payload.productID){
                    state.currentLogUser.totalPrice-=item.cartPrice;
                }

                return item.productID != action.payload.productID;
            })

        },

        itemQtyHandler: (state, action)=>{

            // quantity increment
            if(action.payload.type === CART_ITEM_QTY_INCREMENT){

                // increment item quantity in registered user
                state.registeredUsers = state.registeredUsers.map(registeredUser => {
                    if(registeredUser.id == state.currentLogUser.id){
                        registeredUser.cartItems = registeredUser.cartItems.map(item => {
                            if(item.productID == action.payload.productID){
                                if(item.quantity != item.cartQty){
                                    item.cartQty++;
                                    item.cartPrice+=item.price;
                                    registeredUser.totalPrice+=item.price;
                                }
                            }

                            return item;
                        })
                    }
                    
                    return registeredUser;
                })


                // increment item quantity in current log user
                state.currentLogUser.cartItems = state.currentLogUser.cartItems.map(item=>{
                    if(item.productID == action.payload.productID){
                        if(item.quantity != item.cartQty){
                            item.cartQty++;
                            item.cartPrice+=item.price;
                            state.currentLogUser.totalPrice+=item.price;
                        }
                    }
                    return item;
                })
            }


            // quantity decrement
            if(action.payload.type === CART_ITEM_QTY_DECREMENT){

                // decrement item quantity in registered user
                state.registeredUsers = state.registeredUsers.map(registeredUser => {
                    if(registeredUser.id == state.currentLogUser.id){
                        registeredUser.cartItems = registeredUser.cartItems.map(item => {
                            if(item.productID == action.payload.productID){
                                if(item.cartQty != 1){
                                    item.cartQty--;
                                    item.cartPrice-=item.price;
                                    registeredUser.totalPrice-=item.price;
                                }
                            }

                            return item;
                        })
                    }
                    
                    return registeredUser;
                })


                // decrement item quantity in current log user
                state.currentLogUser.cartItems = state.currentLogUser.cartItems.map(item=>{
                    if(item.productID == action.payload.productID){
                        if(item.cartQty != 1){
                            item.cartQty--;
                            item.cartPrice-=item.price;
                            state.currentLogUser.totalPrice-=item.price;       
                        }
                    }
                    return item;
                })
            }


        }
    }
})


export default userSlice.reducer;

// export some state for maintainable usage
export const allRegisteredUsers = (state) => state.users.registeredUsers;
export const selectCurrentLogUser = (state) => state.users.currentLogUser;
export const allCartItems = (state) => state.currentLogUser.cartItems;
export const allCartItemsTotalPrice = (state) => state.currentLogUser.totalPrice;

export const {registerNewUser, setCurrentLoginUser, addItems, deleteItem, itemQtyHandler} = userSlice.actions;