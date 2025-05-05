import { configureStore } from "@reduxjs/toolkit"
import productReducer from "../redux/Slice/Productslice"
import cartReducer from "../redux/Slice/AddtocartSlice";
import addtoWishReducer from "./Slice/AddwhislistSlice";
import authReducer from  "./Slice/LoginuserSlice"


const store = configureStore({

    reducer: {
        products: productReducer,
        cart: cartReducer,
        wish: addtoWishReducer,
        auth: authReducer,
    }
})

export default store;