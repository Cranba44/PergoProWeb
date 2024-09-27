export const getAllProduct = async () => {
    const res = await fetch('http://localhost:3000/products')
    const result= await res.json()

    return result.data
}

export const getProductById = async (idProduct) => {
    const res = await fetch(`http://localhost:3000/products/${idProduct}`)
    const result = await res.json()
    return result.product
}


export const updateProduct = async(idProduct, newProductUpdated) => {
    const res= await fetch(`http://localhost:3000/products/update/${idProduct}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'Application/json'
        },
        body: JSON.stringify(
            {
                ...newProductUpdated
            }
        )
    })
    const result = await res.json()
    return result.updateProduct

}

export const deleteProduct = async(idProduct) => {
    const res = await fetch(`http://localhost:3000/products/deleteProduct/${idProduct}`, {
        method: 'DELETE',
        headers: {
            'content-type' : 'Application/json'
        },
    })
    const result = await res.json();
    return result.products
}

export const createProduct = async (newProduct) => {
    const res = await fetch('http://localhost:3000/products/createProduct', {
        method: 'POST', 
        headers: {
            'content-type' : 'Application/json'
        },
        body: JSON.stringify({
            ...newProduct
        })
    })
    const result = await res.json()
    return result.products
}