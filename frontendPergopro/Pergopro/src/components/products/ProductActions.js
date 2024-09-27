export const LOAD_PRODUCTS= 'LOAD_PRODUCTS';
export const GET_PRODUCT_BY_ID = 'GET_PRODUCT_BY_ID';


export const loadProducts = (payload) => {
    return {
        type: LOAD_PRODUCTS,
        payload
    }
}

export const loadProduct = (payload) => {
    return {
        type: GET_PRODUCT_BY_ID,
        payload
    }
}