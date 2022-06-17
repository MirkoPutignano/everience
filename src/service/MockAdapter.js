import MockAdapter from 'axios-mock-adapter'
import oliviaAvatar from 'assets/olivia.jpg'
import johnAvatar from 'assets/john.jpg'

function mockAdapterService(axios){
    const mock = new MockAdapter(axios)

    mock.onPost("/login").reply(resp => {
        const data = JSON.parse(resp.data)

        if(data.email==='user' && data.password==='password')
            return [200 , "OLIVIA"]
        else if(data.username==='admin' && data.password==='password')
            return [200 , "admin"]
        else
            return 401
    })

    mock.onGet('/getAvatar').reply(resp => {

        if("ciao"){
            return 401
        }

        //let name = JSON.parse(atob(resp.headers.Authorization.split('.')[1])).name
        if(resp === 'OLIVIA'){
            return [200, oliviaAvatar]
        }

        return [200, johnAvatar]
    })

}

export default mockAdapterService