import http from './RestService'

export const pharmacy = () => {
    return http.get("http://localhost:8080/pharmacy/getall")
}
export const insertPharmacy = (insertPharmacy) => {
    return http.post("http://localhost:8080/pharmacy/insert",{ pharmacyName: insertPharmacy.pharmacyName, city: insertPharmacy.city})
}
export const updatePharmacy = (updatePharmacy, idPharmacy) => {
    return http.put("http://localhost:8080/pharmacy/update",{id: idPharmacy, pharmacyName: updatePharmacy.pharmacyName, city: updatePharmacy.city})
}
export const deletePharmacy = (id) => {
    return http.delete("http://localhost:8080/pharmacy/delete?id="+id)
}
