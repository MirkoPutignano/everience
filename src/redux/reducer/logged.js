const loggedReducer = (state = null, action) => {
    switch(action.type){
        case 'LOGIN':
            return action.username
        case 'LOGOUT':
            return null
        default: 
            return state;
    }
}

export default loggedReducer;