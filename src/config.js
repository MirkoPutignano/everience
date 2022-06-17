const mock = {
    mock:{
        ACTIVE: true
    },
    back: {
        URL:''
    }
}


const local = {
    mock: {
        ACTIVE: false
    },
    back: {
        URL:'http://localhost:8080'
    }
}

const server = {
    mock: {
        ACTIVE: false
    },
    back: {
        URL:'http://ip_server:porta_server'
    }
}

let config = {}
switch(process.env.REACT_APP_ENV){
    case 'local':
        config = local
        break
    case 'server':
        config = server
        break
    default:
    case 'mock':
        config = mock
        break
}

const props = {
    // proprietà in comune
    STYLE: "Addio Vittorio",
    ...config
}

export default props