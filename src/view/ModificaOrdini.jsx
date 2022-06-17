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



function ModificaOrdini() {

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
            console.log("quantity")
            } 
        })
    }


    return (
        <Grid>
            <h1>Modifica Ordini</h1>
            <form style={{ width: '600px', justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "row" }} onSubmit={handleSubmit(doUpdate)}>
                <Grid style={{ marginTop: "10px" }} >
                <FormControl>
                            <InputLabel>ID Prodotto</InputLabel>
                            <Input
                            {...register("idProduct")}
                            type='text'
                            />
                        </FormControl>
                        <FormControl>
                            <InputLabel>ID Farmacia</InputLabel>
                            <Input
                            {...register("idPharmacy")}
                            type='text'
                            />
                        </FormControl>
                        <FormControl>
                            <InputLabel>ID User</InputLabel>
                            <Input
                            {...register("idUser")}
                            type='text'
                            />
                        </FormControl>
                        <FormControl>
                            <InputLabel>Quantità</InputLabel>
                            <Input
                            {...register("quantity")}
                            type='text'
                            /> 
                        </FormControl>
                    <Button variant="contained" color="secondary" type="submit">Modifica</Button>
                </Grid>
            </form>
            <br></br>
            <Button onClick={() => history.push('/ordini')}>Indietro</Button>
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
export default ModificaOrdini