import { Redirect, Route, Switch } from 'react-router'
import Registrazione from 'view/Registrazione'
import DashboardPage from 'view/Dashboard'
import LoginPage from 'view/Login'
import Farmacie from 'view/Farmacie'
import AboutUs from 'view/AboutUs'
import Galleria from 'view/Galleria'
import Home from 'view/Home'
import Profilo from 'view/Profile'
import ModificaFarmacie from 'view/ModificaFarmacie'
import Prodotti from 'view/Prodotti'
import ModificaProdotti from 'view/ModificaProdotti'
import Ordini from 'view/Ordini'
import ModificaOrdini from 'view/ModificaOrdini'

export const navbarPath = [
    {
        path: '/galleria',
        component: Galleria,
        label: 'Galleria',
        exact: false
    },
    {
        path: '/farmacie',
        component: Farmacie,
        label: 'Farmacie',
        exact: false
    },
    {
        path: '/prodotti',
        component: Prodotti,
        label: 'Prodotti',
        exact: false
    },
    {
        path: '/ordini',
        component: Ordini,
        label: 'Ordini',
        exact: false
    },
    {
        path: '/about',
        component: AboutUs,
        label: 'Informazioni',
        exact: false
    },
]


const hiddenPath = [
    {
        path: '/',
        component: Home,
        exact: true
    },
{
        path: "/modificaFarmacie",
        component: ModificaFarmacie,
        exact: false
},
{
    path: "/modificaProdotti",
    component: ModificaProdotti,
    exact: false
},
{
    path: "/modificaOrdini",
    component: ModificaOrdini,
    exact: false
},
{ 
         path: "/profile",
        component: Profilo,
        exact: false
    
    }
]

const senzaEssereLoggati = [{
    path: "/registrazione",
    component: Registrazione
}]



export const printInitialRoutes = (logged) => {

    const redirect = (<Redirect from='*' to='/' />)
    
    if(logged)    
        return (
            
            <Switch>
                <Route key={0} path={'/'} ><DashboardPage /></Route>
            </Switch>
        )
    else
        return (
            <Switch>
                <Route key={0} path={'/'} exact={true} ><LoginPage /></Route>
                {senzaEssereLoggati.map((route,index) => (<Route key={index} path={route.path} exact={route.exact}><route.component /></Route>))}
                {redirect}
            </Switch>
        )
}

export const printRoutes = () => {
    return (
        <Switch>
            {hiddenPath.concat(navbarPath).map((route,index) => (
                <Route key={index} path={route.path} exact={route.exact}><route.component  /></Route>
            ))}
        </Switch>
    )
}
