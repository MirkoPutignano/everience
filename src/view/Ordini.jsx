import React, { useEffect } from 'react'
import { Grid, Table, TableRow, TableCell, TableContainer, TableHead, TableBody, Paper} from '@mui/material'
import { useState, setStates, states, classes, errors, } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'
import { useDispatch } from 'react-redux'
import { insertAction } from 'redux/action'
import { Orders, insertOrdini } from 'service/OrderService'
import { FormControl, Input, InputLabel, InputAdornment, IconButton, FormHelperText, Button } from '@mui/material'


function Ordini() {

    const history = useHistory()
    const insertDispatch = useDispatch()
    const { register, handleSubmit} = useForm()


    const doInsert = data => {
        insertOrdini(data).then(resp =>{
            if(resp.data){ 
                insertDispatch(insertAction(resp.data))
            }else{
                setStates({...states,snackbar:true})
            }
        })
    }

    var [ordiniList, setOrders] = useState([]);

    useEffect(()=> {
        Orders().then((resp)=> {
            setOrders(resp.data)});
        },[]);
    
    return (
        <Grid container alignItems='center' justifyContent='center'>
            {<TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow >
                    <TableCell style={{fontWeight:'bold'}}>Id ordine</TableCell>
                    <TableCell style={{fontWeight:'bold'}}>Id utente</TableCell>
                    <TableCell style={{fontWeight:'bold'}}>Id prodotto</TableCell>
                    <TableCell style={{fontWeight:'bold'}}>Id farmacia</TableCell>
                    <TableCell style={{fontWeight:'bold'}}>Quantità</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {console.log(ordiniList)}
                {ordiniList.map((row) => (
                    <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row" >{row.id}</TableCell>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.user.id}</TableCell>
                    <TableCell>{row.product.id}</TableCell>
                    <TableCell>{row.pharmacy.id}</TableCell>
                    <TableCell>{row.quantity}</TableCell>
                  
                    <Button onClick={() => history.push('/modificaOrdini?id='+row.id)}>Modifica</Button>
                    </TableRow>

                ))}
                </TableBody>
            </Table>
            </TableContainer>}
            <form style={{width: '600px', justifyContent:"center", alignItems:"center",display: "flex", flexDirection: "row"}} onSubmit={handleSubmit(doInsert)}>
                    <Grid style={{marginTop:"10px"}} >
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
                     <Button variant="contained" color="secondary" type="submit">Inserisci</Button>
                    </Grid>
                </form>
            <Button onClick={() => history.push('/')}>Indietro</Button>
           

        </Grid>

    );
}

export default Ordini