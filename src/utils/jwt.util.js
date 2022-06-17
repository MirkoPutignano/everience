import store from 'redux/store'

/*const getJwtPayload = () => {
    const state = store.getState()
    const jwt = state.logged

    return JSON.parse(atob(jwt.split('.')[1]))
}

export const getUserName = () => {
    return getJwtPayload().name
}*/
export const getUserName = () => {
    const state = store.getState()
    const username = state.username
    return username
}