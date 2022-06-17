import http  from './RestService'

export const getAvatar = () => {
    return http.get('/getAvatar')
}