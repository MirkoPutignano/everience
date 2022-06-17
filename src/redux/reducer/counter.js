const counterReducer = (state = 0, action) => {
    switch(action.type){
        case 'AUMENTA':
            return state+1
        case 'DIMINUISCI':
            return state-1
        case 'SOMMA':
            return state+action.value
        case 'SOTTRAI':
            return state+action.value
        default: 
            return state;
    }
}

export default counterReducer;