import http from './RestService'

export const insert = (insert) => {
    return http.post("http://localhost:8080/user/insert",{ username: insert.user, password: insert.password})
}