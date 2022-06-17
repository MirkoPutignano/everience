import axios from 'axios'
import props from 'config'
import store from 'redux/store'
import mockAdapterService from './MockAdapter'
import { logoutAction } from 'redux/action'

const http = axios.create({
    baseURL: props.back.URL,
    headers: {
        "Content-type": "application/json"
  }
})

http.interceptors.request.use(config => {
    const state = store.getState()
 
    if(state.logged){
        config.headers.Authorization = `Bearer ${state.logged}`
    }        
    return config;
});

http.interceptors.response.use(
    resp => resp, 
    err => {
        if(err.response && 401 === err.response.status)
            store.dispatch(logoutAction())
        return err
    }
)

if(process.env.REACT_APP_ENV==='mock')
    mockAdapterService(http)

export default http