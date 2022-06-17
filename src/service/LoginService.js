import http from './RestService'

export const login = (login) => {
    return http.post("http://localhost:8080/user/login",{ username: login.user, password: login.password})
}
