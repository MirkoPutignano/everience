import http from './RestService'

export const Product = () => {
    return http.get("http://localhost:8080/product/getall")
}
export const insertProduct = (insertProduct) => {
    return http.post("http://localhost:8080/product/insert",{ productname: insertProduct.productName, price: insertProduct.price, producttype: insertProduct.productType})
}
export const updateProduct = (updateProduct, idProduct) => {
    return http.put("http://localhost:8080/product/update",{id: idProduct, productname: updateProduct.ProductName, price: updateProduct.price, producttype: updateProduct.productType})
}
export const deleteProduct = (idProduct) => {
    return http.delete("http://localhost:8080/product/delete?id="+idProduct )
}