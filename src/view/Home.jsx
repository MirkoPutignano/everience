import React from 'react'
import { Grid } from '@mui/material'
import logo from 'assets/farmacie.jpg'
import { useHistory } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { getUserName } from 'utils/jwt.util'



function Home(){

    const nome = getUserName()

    const history = useHistory()
    const username = useSelector((state) => state.logged);
    console.log(username)
    return (
        <Grid container alignItems='center' justifyContent='center'>
            <h1>Pharmacia</h1>
            <h2>Benvenuto Pharmacia. Siamo qui per offrirti una lista di farmacie disponibili per effettuare i tuoi ordini comodamente da casa a distanza di un click.</h2>
            <img src={logo} alt="Farmacie" onClick={() => history.push('/farmacie')} style={{ cursor: 'pointer'}}/>
        </Grid>
    )
}

export default Home