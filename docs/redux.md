# Redux

Oltre allo stato di ogni singolo componente, ci sono informazioni globali che dovrebbero essere accessibili da ogni punto dell'applicazione.

___Redux___ è una libreria JavaScript che mette a disposizione uno ___store___ globale nel quale memorizzare tutte le informazioni necessarie all'applicazione. 

Tutti gli stati dell'applicazione saranno descritti da un ___reducer___ che descriverà lo stato iniziale e le azioni consentite sullo stesso ([logged.js](../src/redux/reducer/logged.js))

```js
const loggedReducer = (state = null, action) => {
    switch(action.type){
        case 'LOGIN':
            return action.jwt
        case 'LOGOUT':
            return null
        default: 
            return state;
    }
}
```

Tutti i _reducer_ saranno combinati in un unico _store_ dalla funzione ___combineReducers___ ([index.js](../src/redux/reducer/index.js)).

```js
const reducers = combineReducers({
    logged: loggedReducer,
    counter: counterReducer
});
```

Tutto ciò verrà utilizzato per creare lo _store_ utilizzabile nell'applicazione ([store.js](../src/redux/store.js)).

```js
const store = createStore(reducers);
```

A questo punto non dovremo far altro che importare lo store nei vari componenti, l'operazione è differente se il componente è un componente React o un semplice script js:

- ___React___: ci aiuta la libreria __react-redux__

  ```jsx
  import { useSelector } from 'react-redux'
  
  function App() {
  	const logged = useSelector((state) => state.logged)
  	. . .
  }
  ```

  importando ___useSelector___ siamo in grado di sottoscriverci allo stato interessato, il che renderizzerà automaticamente il componente ad ogni cambiamento dello stesso.

- ___JS___: in un normale componente JavaScript ci basterà importare lo _store_ dalla libreria ___redux/store___ per utilizzare il metodo ___getStore()__ che ci restituirà lo stato aggiornato dello store.

  ```js
  import store from 'redux/store'
  
  const state = store.getState()
  ```

Per aggiornare lo stato dello store utilizzeremo le __action__, metodi JS che descrivono precisamente quali azioni effettuare sullo store.

```js
export const loginAction = (token) => {
    return {
        type: 'LOGIN',
        jwt: token
    }
}

export const logoutAction = () => {
    return {
        type: 'LOGOUT'
    }
}
```

__Da notare__ che le azioni `LOGIN` e `LOGOUT` devono coincidere con quelle descritte nei _reducer_.

A questo punto, in modo simile a quanto fatto per leggere lo stato dello _store_, utilizzeremo due procedure differenti per aggiornare lo stato dello store:

- ___React___: da `react-redux` importeremo __useDispatch__, un metodo che richiede come parametro l'azione da eseguire.

  ```jsx
  import { useDispatch } from 'react-redux'
  import { logoutAction } from 'redux/action'
  
  function DashboardPage(){
  	
      const logout = useDispatch()
      
      return (
          <Button onClick={() => logout(logoutAction())}
      )
  }
  ```

- ___JS___: in modo simile a quanto fatto nei componenti React, importeremo lo _store_ e l'action da effettuare e, tramite il metodo ___dispatch___ dello _store_, effettueremo l'azione sull store.

  ```js
  import store from 'redux/store'
  import { logoutAction } from 'redux/action'
  
  store.dispatch(logoutAction())
  ```

