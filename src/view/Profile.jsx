import React from 'react'
import { Grid, Button } from '@mui/material'
import { useHistory } from 'react-router-dom'
import {useSelector} from 'react-redux'

function Profile(){
  
        const history = useHistory();
        const username = useSelector((state) => state.logged);
        console.log(username)

        return (
            <Grid container alignItems='center' justifyContent='center'>
                <h1>Ciao,{username}</h1>
                <Button onClick={() => history.push('/')}>Indietro</Button>

            </Grid>

        );
    }

export default Profile