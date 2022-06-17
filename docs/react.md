# React

- [Inizializzazione](#ini)
- [Cos'è](#cose)
- [Struttura principale](#strutt)
- [JSX](#jsx)
- [Componenti: state e props](#comp)
- [Class](#class)
- [Hook](#hook)
- [Environments](#envs)
- [Import](#imp)
- [CSS](#css)
- [react-router-dom](#rrd)
- [react-hook-form](#rhf)

### <a name="ini"></a>Cos'è
Dopo aver installato l'ultima versione del Node.js per avviare l'applicazione bisogna posizionarsi nella cartella principale del progetti nel terminale di Visual Studio Code e eseguire i seguenti comandi:

- npm i
- npm run startWin

### <a name="cose"></a>Cos'è

__React__ è una __libreria__ JavaScript per la creazione di interfacce utente. 

Per lo sviluppo con React, è necessario NodeJs.

Per creare un nuovo progetto è necessario eseguire il comando `npx create-react-app <nomeApp>`.

Per eseguire un progetto nuovo senza specifici environments si esegue `npm start`.



### <a name="strutt"></a>Struttura principale

```
.
├ public 			# contiene tutto il necessario per un
│	├ favicon.ico	# normale sito internet
│	├ index.html
│	├ manifest.json
│	└ robots.txt
├ src				# contiene il progetto React
│	├ App.js			
│	├ index.js		# è l'inizio del progetto React che si collega all'index.html
│	├ index.css
│	├ config.js		# contiene i vari environments
│	└ router.js		# contiene gli array con tutti i path dell'applicazione
├ jsconfig.json		# definisce l'inizio di tutti i path dell'applicazione
└ package.json
```

- __index.html__

  ```html
  <html lang="it">
    <head>
      . . .
      <title>React Template</title>
    </head>
    <body>
      <noscript>You need to enable JavaScript to run this app.</noscript>
      <div id="root"></div>
    </body>
  </html>
  
  ```

  E' una normale pagina html dove possiamo specificare tutte le informazioni relative la nostra applicazione come un normale sito internet, la parte importante è `<div id="root"></div>`.

- __index.js__

  ```jsx
  ReactDOM.render(
      <Provider store={store}>
          <Router>
            <App />
          </Router>
      </Provider>,
    document.getElementById('root')
  );
  ```

  Oltre i necessari import, esegue solo la funzione `React.render()` che richiede due parametri:

  - DOM da renderizzare
  - tag dove renderizzare: qui si fa riferimento al  `<div id="root"></div>` contenuto nell' `index.html` tramite il metodo `document.getElementById('root')`

  Il tag `App` è un componente React che contiene tutta la nostra applicazione

  Il tag `Router` non è altro che il componente React `BrowserRouter` importato da [`react-router-dom`](#rrd)

  __Da notare__: il DOM nel metodo `render` _deve essere contenuto sempre_ in un'unico tag che racchiude tutto il restante DOM, in questo caso il tag `Provider` spiegato nella sezione _[Redux](./redux.md)_



### <a name="jsx"></a>JSX

```jsx
const title = <h1>Home Page</h1>
```

Questa sintassi è tipica del JSX ( JavaScript extension ) e produce un elemento React che può essere facilmente renderizzato nel DOM utilizzando le _parentesi graffe_.

```jsx
<div>
	{title}
</div>
```

 Le _parentesi graffe_ sono utilizzate per due motivi:

- all'interno di codice _js_ definiscono un oggetto

- all'interno del _DOM_ permettono di indicare che il contenuto è un oggetto _js_/_jsx_ da renderizzare, alcuni esempi, oltre a quello fatto in precedenza, possono essere:

  - l'esecuzione di una operazione ternaria

    ```jsx
    { isLoggato ? title : "" }
    ```

  - l'esecuzione di un operazione di stream su un array dal quale renderizzeremo parte del DOM per ogni elemento dell'array

    ```jsx
    { mioArray.map( (el,i) => (<a key={i} href={el.path}>el.label</a>) )}
    ```

    __Da notare__: quando si utilizza un ciclo per renderizzare elenchi di qualsiasi tipo è richiesta l'aggiunta del tag `key` al quale verrà assegnato l'indice del ciclo.

  __Da notare__: qualsiasi sia l'utilizzo delle parentesi graffe all'interno del DOM, è possibile eseguire una sola operazione, pertanto per eseguire successivamente due o più operazioni è necessario racchiudere ogni operazione all'interno di parentesi graffe.



### <a name="comp"></a> Componenti: state e props

I componenti React possono essere realizzati in due modi differenti: 

- Class
- Hook

In entrambi i casi, due elementi fondamentali di un componente React sono gli __state__ e le __props__:

- ___state___: rappresentano lo stato interno del componente, ad ogni cambiamento di questi stati viene renderizzato nuovamente l'intero componente, un esempio può essere: lo stato di una modal (aperta o chiusa). Vengono realizzate in modo diverso tra Class e Hook.

- ___props___: sono i parametri che vengono passati al componente dal componente padre

  ```jsx
  <Navbar logo={logo} navLinks={navbarPath} avatar={avatar} user={nome} logOut={() => logout(logoutAction())}/>
  ```

  In questo esempio  ([Dashboard.js line 23](../src/view/Dashboard.jsx)), il componente `Navbar` riceve le _props_ `logo` ,  `navLinks`, `avatar`, `user` e `logOut` dal componente padre.

  Indifferentemente dall'utilizzo degli Class o Hook, è possibile specificare tutte le _props_ che il componente accetta e, soprattutto, quelle obbligatorie ([Navbar.js line 44](../src/component/Navbar.js))

  ```js
  Navbar.propTypes = {
      logo: PropTypes.any.isRequired,
      navLinks: PropTypes.arrayOf({ 
      	path: PropTypes.string, 
      	label: PropTypes.string 
      }).isRequired,
      user: PropTypes.string.isRequired,
      avatar: PropTypes.any,
      logOut: PropTypes.func.isRequired
  }
  ```

  __Da notare__: `logOut` riceve una funzione, questa è un azione che il componente eseguirà quando preferiamo ( click di un bottone, scroll della pagina ) e questa azione verrà comunque eseguita dal componente padre e, se agisce sugli stati, agirà sugli stati del componente padre.



### <a name="class"></a> Class

```jsx
class Navbar extends React.Component{
	constructor(props){
		super(props)
		this.state = {
            isOpenModal: false
			size: 0
		}
	}
    
    componentDidMount(){
        this.setState({
            ...this.state,
            contatore: this.state.size
        })
    }
    
    render() {
        return (
            <div>
            	{this.state.isOpenModal ? this.state.size : 0}
                <a href=""></a>
            </div>
        )
    }
}
```

- Il componente React, realizzato con le __classi__, estende sempre _React.Component_

- Il costruttore richiede le ___props___ e le inoltra tramite il `super` alla classe _React.Component_

- Gli ___stati___ vengono descritti nel construttore tramite un oggetto js contenuto in `this.state` (fornito dalla classe React.Component). 

  __Da notare__: non vengono modificati direttamente, si utilizza la funzione `this.setState()` al quale passeremo tutto il nuovo oggetto di stato

- __componentDidMount__ è uno degli stati del ciclo di vita del componente React realizzato in classe, ci sono differenti `lifecycle` di un componente

- __render__ è il metodo _obbligatorio_ che renderizza il componente. Come detto in precedenza, l'intero DOM del componente deve essere contenuto in un singolo tag (in questo esempio il `div`).



### <a name="hook"></a> Hook 

Esempio [Navbar.js](../src/component/Navbar.js)

```jsx
function Navbar(props){

    const history = useHistory()
    const [anchor, setAnchor] = useState(null)
    const [avatarImage, setAvatarImage] = useState(null)

    useEffect(() => {
        setAvatarImage(props.avatar)
    }, [props.avatar])

    return (
        <AppBar position="static" variant='elevation'>
            <Toolbar>
                . . .
                <Avatar alt={`Ciao ${props.user}`} src={avatarImage}>{props.user}</Avatar>
                . . .
                <Menu open={Boolean(anchor)} onClose={() => setAnchor(null)} anchorEl={anchor} keepMounted>
                . . .
            </Toolbar>
        </AppBar>
    )
}
```

Gli __Hook__ sono più recenti (aggiunti in React 16.8), e rapidi da realizzare.

Ultimamente si tende ad utilizzare solo questa forma di componente React abbandonando la precedente a classe.

- Il componente React viene realizzato come una __funzione__ e non estende nient'altro

- Questa funzione riceve le __props__ che saranno subito utilizzabili

- Gli __stati__ vengono creati usando la funzione `useState()` che richiede un parametro il quale sarà il valore iniziale. Questa funzione restituisce due oggetti:

  -  il primo è la variabile dalla quale potremo leggere il __valore__ attuale
  - la seconda è la funzione che utilizzeremo per __aggiornare__ lo stato

- __useEffect__ sostituisce tutti i cicli di vita del componente, richiede due parametri:

  - il primo è la __callback__ da eseguire ogni volta che viene aggiornata una delle props
  - la seconda è la __lista__ delle props da monitorare

  Nell'esempio viene monitorata una sola props, ma è possibile monitorare più props eseguendo la stessa callback oppure definire diversi _useEffect_ con una specifica callback per ogni props.

- il __return__ del nostro componente contiene il DOM da renderizzare, anche in questo caso, l'intero DOM deve essere contenuto in un solo tag ( in questo caso `AppBar`)



### <a name="envs"></a> Environments

Essendo una libreria, e non un framework, React non gestisce differenti _environments_ ma il tutto può essere gestito tramite il js.

```jsx
const mock = { . . . }

const local = { . . . }

const server = { . . . }

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
```

Nel file [config.js](../src/config.js) sono stati definiti tre oggetti differenti che rappresentano i nostri _envs_, lo `switch` assegnerà uno di questi oggetti all'oggetto _config_ che successivamente verrà aggiunto all'oggetto _props_ ed esportato.

La scelta di quale oggetto mappare in config dipende dal valore che assume la variabile _REACT_APP_ENV_, il valore di quest'ultima viene assegnato dallo script con il quale viene eseguita l'applicazione ( [package.json linea 23](../package.json)).



### <a name="imp"></a> Import

__Da notare__: le librerie importate con queste diciture seguono il pattern ___singleton___.

```js
import React from 'react'
import { getAvatar, . . . } from 'service/UserService'
import { navbarPath, printRoutes } from 'router'
import './index.css'
import logo from 'assets/logo.png'
```

__Da notare__:  `import React from 'react'` è obbligatorio in ogni file che contiene un componente React

Questi sono diversi esempi di import:

1. notiamo la mancanza delle parentesi graffe: il componente React viene esportato come `export default React` quindi, durante l'import, non richiede le parentesi graffe

2. nel file UserService, ci saranno più _export_, uno per ogni chiamata rest, pertanto non si può definire un default.
3. quando ci sono più export nello stesso file, è possibile usare un solo import nel quale elencheremo tutto ciò che vogliamo importare
4. nel caso di _css_, possiamo importarli senza contenerli in una variabile, in questo modo saranno subito disponibili nel metodo più classico
5. possiamo importare anche file di diverso tipo, in questo caso una _png_



### <a name="css"></a> CSS

- I _CSS_ possono essere __esterni__ ed importati come nell'esempio precedente

- possono essere descritti come oggetti __JS__ e trasformati in __css__ usando la funzione __makeStyle()__ che richiede come parametro proprio questo oggetto

  ```jsx
  const style = makeStyles({
      gridLogin: {
          height: '70vh',
          width: 'max-content'
  })
  
  function LoginPage(){
      . . .
      const classes = style()
      . . .
      return (
          . . .
              <Grid container className={classes.gridLogin}>
       			. . .
          	</Grid>
  		. . .
      );
  }
  ```

  

- possono essere definiti __in linea__ tramite il tag __style__ che, a sua volta, richiederà un oggetto _js_

  __Da notare__ l'utilizzo delle doppie parentesi graffe, le prime definiscono l'utilizzo del _js_ all'interno del _DOM_ mentre le seconde definiscono la definizione di un oggetto _js_.

  ```jsx
  <img . . . style={{ cursor: 'pointer'}}/>
  ```



###  <a name="rrd"></a>react-router-dom

E' una librearia di React che permette di gestire il routing dei componenti React.

Si installa con il comando `npm i react-router-dom` e, nel caso di applicazioni desktop, importeremo il componente __BrowserRouter__. 

Utilizzandolo come un tag html, saremo in grado di accedere al path del browser da ogni componente contenuto al suo interno.

```jsx
import React from 'react'
. . .
import { BrowserRouter as Router} from 'react-router-dom'

ReactDOM.render(
    <Provider store={store}>
        <Router>
          <App />
        </Router>
    </Provider>,
  document.getElementById('root')
);

```

Nel caso dell'[index.js](../../src/index.js), contiene il componente `App`, quindi tutta la nostra applicazione.

```jsx
<Switch>
    <Route key={0} path={'/'} exact={true} ><LoginPage /></Route>
    {senzaEssereLoggati.map((route,index) => (<Route key={index} path={route.path} exact={route.exact}><route.component /></Route>))}
 </Switch>
```

All'interno di un qualsiasi componente, potremo utilizzare i componenti __Switch__ e __Route__, importati sempre da `react-router-dom`, per renderizzare un componente diverso sulla base del path del browser.

In questo esempio abbiamo un componente fisso al path "/" e una lista di componenti contenuti in un array, per ognuno di esso verrà generato automaticamente un componente _Route_.

Ripetendo questa struttura in diversi componenti si può generare una gerarchia di path padre/figlio.

Per modificare il path, e quindi spostarci tra i vari componenti, senza ricaricare la pagina del browser, utilizzeremo il metodo `push` di __useHistory__.

```jsx
import { useHistory } from 'react-router'

function LoginPage(){
	. . .
    const history = useHistory()
    . . .
    return (
        . . .
        <Button onClick={() => history.push("/path")}
        . . .
    )
}
```



### <a name="rhf"></a>react-hook-form

Questa libreria ci permette di gestire facilmente i form con i necessari controlli di ogni campo.

```
import { useForm } from 'react-hook-form'

function LoginPage(){
	. . .
    const { register, handleSubmit, formState: {errors} } = useForm()
    
    render(
    	<form onSubmit={handleSubmit(doLogin)}>
            . . .
            <Input
                {...register("user",{required: 'Campo obbligatorio', pattern:{ value: /^([A-Za-z ])+$/, message:"Solo lettere"}})}
                error={errors.user ? true : false}
                autoFocus
                type='text'
                . . .
                />
                <FormHelperText error>{errors.user ? errors.user.message : ""}</FormHelperText>
            . . .
                <Input
                {...register("password",{required: 'Campo obbligatorio', minLength:{ value:8, message:'Minimo 8 caratteri'}})}
                error={errors.password ? true : false}
                type={states.showPassword ? 'text' : 'password'}
                . . .
                />
                <FormHelperText error>{errors.password ? errors.pasword.message : ""}</FormHelperText>
            . . .
            <Button className={classes.button} variant="contained" color="primary" type="submit">accedi</Button>
            . . .
        </form>
    )
}
```

Importando __useForm__ otterremo diversi oggetti:

- ___register___: contiene tutti i campi con i relativi controlli e valori attuali. Per aggiungere un campo da verificare basterà, all'interno del tag da gestire, aggiungere la seguente porzione di codice ` {...register("nomeCampo",{controlli da effettuare con relativi messaggi di errore})}`. Nell'esempio del login, al campo _user_ sono stati aggiunti due controlli: il primo riguarda l'obbligatorietà del campo `required: 'Campo obbligatorio'` e il secondo, sfruttando un _regex_, permette l'inserimento dei soli caratteri dell'alfabeto `pattern:{ value: /^([A-Za-z ])+$/, message:"Solo lettere"}`. Ci sono diversi tipi di controlli descritti nella documentazione ufficiale.

- __handleSubmit__: è la funzione alla quale passeremo la _callback_ da effettuare al submit del form. Naturalmente verrà eseguita solo se tutti i valori inseriti saranno validi.

- ___errors___: ci permette di verificare l'eventuale presenza di errori e di avere il messaggio di errore corretto.

  Come nell'esempio,  `{errors.password ? errors.pasword.message : ""}`, grazie a questa operazione ternaria, stamperemo il messaggio di errore corretto solo nel caso in cui si verifica l'errore.