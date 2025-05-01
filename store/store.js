import { configureStore } from '@reduxjs/toolkit'
import { productSlice } from './CreateSlice/slice';

export const myStore = configureStore({
  reducer: {
    productSlice : productSlice.reducer
  },
})

export default myStore;