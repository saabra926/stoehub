import { createSlice } from '@reduxjs/toolkit'


export const productSlice = createSlice({
    name: 'product-slice',
    initialState: {
        cart: []
    },
    reducers: {

        AddtoCart: (state, action) => {
            state.cart.push(action.payload)
        },
        RemoveFromCart: (state, action) => {
            state.cart = action.payload
        },
        closeKro:(state) => {
            state.cart = [];
        }

    },
})



export const { AddtoCart, RemoveFromCart, closeKro } = productSlice.actions
