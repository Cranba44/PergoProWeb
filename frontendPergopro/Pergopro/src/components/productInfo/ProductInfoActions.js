export const LOAD_PRODUCT = 'LOAD_PRODUCT';
export const GET_PRODUCT_BY_ID = "GET_PRODUCT_BY_ID";




export const loadProduct = (products) => {
    return {
        type: LOAD_PRODUCT,
        payload:{
            products
        }
      
    }
}

export const getProductById = (productId) => {
    return{
        type: GET_PRODUCT_BY_ID,
        payload:{
            productId,
        }
    }
}