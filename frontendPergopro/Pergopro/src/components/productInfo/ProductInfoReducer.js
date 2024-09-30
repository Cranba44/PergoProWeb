import { LOAD_PRODUCT, GET_PRODUCT_BY_ID } from "./ProductActions"


const initialState = {
    products: [],
    productId: undefined
}


const productReducer = (state = initialState, action) => {
    
    switch(action.type) {
        case LOAD_PRODUCT: 
            return {
                ...state, 
                products: action.payload.products 
            }
            case GET_PRODUCT_BY_ID:
                return {
                ...state,
                productId: action.payload.productId,
            }
        default:
            return state
        }
}

export default productReducer