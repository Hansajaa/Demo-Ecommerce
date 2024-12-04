import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    mensItems : [],
}

const productSlice = createSlice({
    name:"products",
    initialState,
    reducers:{
        initializeMenProducts: (state, action)=>{
            state.mensItems = action.payload.mensItems;
        }
    }
})

export const { initializeMenProducts } = productSlice.actions;

export const selectMensProducts = (state) => state.products.mensItems;
export default productSlice.reducer;