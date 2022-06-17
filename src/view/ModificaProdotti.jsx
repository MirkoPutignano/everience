import React from 'react'
import { Grid } from '@mui/material'
import { setStates, states } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'
import { updateProduct } from 'service/ProductService'
import { useDispatch } from 'react-redux'
import { insertAction } from 'redux/action'
import { FormControl, Input, InputLabel, Button, Snackbar, Slide } from '@mui/material'
import MuiAlert from '@mui/lab/Alert'



function ModificaProdotti() {

    const history = useHistory()
    const updateDispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const [states, setStates] = React.useState({
        showPassword: false,
        snackbar: false
    })

    const doUpdate = data => {
        updateProduct(data, id).then(resp => {
            if (resp.data) {
                updateDispatch(insertAction(resp.data));
                setStates({...states,snackbar:true})
            }else{
            console.log("cicciobiscotto")
            } 
        })
    }


    return (
        <Grid>
            <h1>Modifica Prodotto</h1>
            <form style={{ width: '600px', justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "row" }} onSubmit={handleSubmit(doUpdate)}>
                <Grid style={{ marginTop: "10px" }} >
                    <FormControl>
                        <InputLabel>Nuovo nome prodotto</InputLabel>
                        <Input
                            {...register("ProductName")}
                            type='text'
                        />
                    </FormControl>
                    <FormControl>
                        <InputLabel> Prezzo </InputLabel>
                        <Input
                            {...register("price")}
                            type='text'
                        />
                    </FormControl>
                    <FormControl>
                        <InputLabel> Tipologia Prodotto </InputLabel>
                        <Input
                            {...register("productType")}
                            type='text'
                        />
                    </FormControl>
                    <Button variant="contained" color="secondary" type="submit">Modifica</Button>
                </Grid>
            </form>
            <br></br>
            <Button onClick={() => history.push('/prodotti')}>Indietro</Button>
            <Snackbar anchorOrigin={{vertical:'top',horizontal:'center'}} 
                open={states.snackbar} 
                onClose={() => setStates({...states,snackbar:false})} 
                autoHideDuration={3000} 
                TransitionComponent={Slide} >
                    <MuiAlert variant="filled" severity="success" elevation={6}>Modifiche avvenute con successo</MuiAlert>
                </Snackbar>
        </Grid>
    )
}
export default ModificaProdotti