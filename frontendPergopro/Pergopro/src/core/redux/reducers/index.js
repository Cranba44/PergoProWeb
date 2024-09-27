import { combineReducers } from "redux";
import userReducer from "../../../components/user/UserReducers";
import productReducer from "../../../components/products/ProductsReducer";




const reducer = combineReducers({
    userReducer,
    productReducer
})

export default reducer;