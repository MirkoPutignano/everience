import http from './RestService'

export const Orders = () => {
    return http.get("http://localhost:8080/pOrder/getall")
}
export const insertOrdini = (insertOrdini) => {
    return http.post("http://localhost:8080/pOrder/newOrder",{ id:null, user: insertOrdini.idUser, product: insertOrdini.idProduct, pharmacy: insertOrdini.idPharmacy, quantity: insertOrdini.quantity})
}
export const updateOrdini = (updateOrdini, idOrdini) => {
    return http.put("http://localhost:8080/pOrder/ModifyOrder",{id:idOrdini, user: updateOrdini.idUser, product: updateOrdini.idProduct, pharmacy: updateOrdini.idPharmacy, quantity: updateOrdini.quantity})
}
export const deleteOrdini = (id) => {
    return http.delete("http://localhost:8080/pOrder/delete?id="+id)
}
