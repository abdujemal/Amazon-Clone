import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    cart: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addProduct: (state, action)=>{
            if(!state.cart.find(p => p._id == action.payload._id)){
                state.cart = [...state.cart, action.payload]
            }
           
        },
        deleteProduct: (state, action)=>{
           
            state.cart = state.cart.filter((product) => product._id != action.payload._id)
        }
    }
})

export const {addProduct, deleteProduct} = cartSlice.actions

export const selectCart = (state) => state.cart.cart

export default cartSlice.reducer;