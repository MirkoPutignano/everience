# Axios

Axios è una libreria JS che gestisce in modo semplice la comunicazione ___REST___.

Per prima cosa creamo la base che verrà utilizzata dai _service_ per la comunicazione _REST_ ([RestService.js](../src/service/RestService.js)).

```js
import axios from 'axios'

const http = axios.create({
    baseURL: props.back.URL,
    headers: {
        "Content-type": "application/json"
  }
})
```

A questo punto possiamo aggiungere i vari __interceptors__ di cui abbiamo bisogno per eseguire automaticamente qualsiasi operazione ogni volta che effettuiamo una chiamata REST (come incapsulare il JWT Token) oppure ogni volta che riceviamo la risposta di una chiamata REST (per controllarne lo stato).

```js
http.interceptors.request.use(config => {
    . . .     
    return config;
});

http.interceptors.response.use(
    resp => resp, 
    err => {
        if(err.response && 401 === err.response.status)
            . . .
        return err
    }
)
```

Non resta che importare ciò che abbiamo appena settato nei nostri service per definire qualsiasi tipo di chiamata REST ([LoginService.js](../src/service/LoginService.js)).

```js
import http from './RestService'

export const login = (data) => {
    return http.post("/authenticate",{ username: data.user, password: data.password})
}
```

Effettuare la chiamata REST appena definita, ed elaborare la risposta, è altrettanto semplice ([Login.jsx](../src/view/Login.jsx)).

```jsx
import { login } from 'service/LoginService'

function LoginPage(){
	. . .
	login(data).then(resp =>{
            if(resp.data){ 
                . . .
            }else{
                . . .
            }
        })
	. . .
}
```

L'oggetto ___data___, all'interno della risposta __resp__, conterrà i valori restituiti dal back-end. 

### axios-mock-adapter

Questa libreria ci permette di intercettare le chiamate REST effettuate tramite Axios e bloccarle restituendo un valore preimpostato senza che il back-end venga contattato, un vero è prprio __mock__.

Il suo utilizzo è molto semplice, importando ___MockAdapter___, e passandogli la variabile che contiene la nostra configurazione di _axios_, potremo definire una serie di risposte da restituire per ogni chiamata ([RestService.js](../src/service/RestService.js)).

```js
import mockAdapterService from './MockAdapter'

const http = axios.create({
   . . .
})

mockAdapterService(http)
```

 [MockAdapter.js](../src/service/MockAdapter.js)

```js 
import MockAdapter from 'axios-mock-adapter'

function mockAdapterService(axios){
    const mock = new MockAdapter(axios)
    
    mock.onPost("/authenticate").reply(resp => {
        const data = JSON.parse(resp.data)

        if(data.username==='user' && data.password==='password')
            return [200 , "JWT Token1"]
        else if(data.username==='admin' && data.password==='password')
            return [200 , "JWT Token2"]
        else
            return 401
    })
    
     mock.onGet('/getAvatar').reply(resp => {
        if(!resp.headers.Authorization){
            return 401
        }

        if(. . .){
            return [200, oliviaAvatar]
        }

        return [200, johnAvatar]
    })
}
```

In questo modo l'applicazione funzionerà correttamente senza la presenza di un back-end che fornisce dati reali.

L'ultilizzo di questo mock può essere abilitato o disabilitato attraverso l'utilizzo degli _environmets_, proprio come è stato realizzato nella presente applicazione.

E' consigliato consultare la documetazione ufficiale di [Axios](https://axios-http.com/docs/intro) e [axios-mock-adapter](https://www.npmjs.com/package/axios-mock-adapter) per verificare le implemetazioni delle varie chiamate REST con i relativi possibili mock.