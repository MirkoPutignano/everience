export const loginAction = (data) => {
   
    return {
        type: 'LOGIN',
        //jwt: token
        username: data.username
    }
}

export const logoutAction = () => {
    return {
        type: 'LOGOUT'
    }
}

export const insertAction = () => {
    return {
        type: 'INSERT',
    }
}

export const readPharmacyAction = () => {
    return {
        type: 'GETALL',
    }
}



export const sommaCounter = (value) => {
    return {
        type: 'SOMMA',
        value: value
    }
}