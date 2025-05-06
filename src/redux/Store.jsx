import { configureStore } from "@reduxjs/toolkit"
import productReducer from "../redux/Slice/Productslice"
import cartReducer from "../redux/Slice/AddtocartSlice";
import wishSliceReducer from "./Slice/AddwhislistSlice";
import authReducer from  "./Slice/LoginuserSlice"


const store = configureStore({

    reducer: {
        products: productReducer,
        cart: cartReducer,
        wish: wishSliceReducer,
        auth: authReducer,
    }
})

export default store;