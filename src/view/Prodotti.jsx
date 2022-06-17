import React, { useEffect } from 'react'
import { Grid, Table, TableRow, TableCell, TableContainer, TableHead, TableBody, Paper} from '@mui/material'
import { useState, setStates, states } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'
import { insertProduct } from 'service/ProductService'
import { deleteProduct } from 'service/ProductService'
import { useDispatch } from 'react-redux'
import { insertAction } from 'redux/action'
import { Product } from 'service/ProductService'
import { FormControl, Input, InputLabel, Button } from '@mui/material'


function Prodotti() {

    const history = useHistory()
    const insertDispatch = useDispatch()
    const { register, handleSubmit} = useForm()
    
    const doDelete = data => {
        deleteProduct(data).then(resp =>{
            if(resp.data){ 
            }else{
                setStates({...states,snackbar:true})
            }
        })
    }

    const doInsert = data => {
        insertProduct(data).then(resp =>{
            if(resp.data){ 
                insertDispatch(insertAction(resp.data))
            }else{
                setStates({...states,snackbar:true})
            }
        })
    }

    var [ProductList, setProduct] = useState([]);

    useEffect(()=> {
        Product().then((resp)=> {
            setProduct(resp.data)});
        },[ProductList]);


        // <Button onClick={doDelete(row.id)}>Elimina</Button> da incollare sotto button onclick historypush
    return (
        <Grid container alignItems='center' justifyContent='center'>
            {<TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow >
                    <TableCell style={{fontWeight:'bold'}}>Id Prodotto</TableCell>
                    <TableCell style={{fontWeight:'bold'}}>Nome Prodotto</TableCell>
                    <TableCell style={{fontWeight:'bold'}}>Prezzo</TableCell>
                    <TableCell style={{fontWeight:'bold'}}>Tipologia Prodotto</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {ProductList.map((row) => (
                    <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row" >{row.id}</TableCell>
                    <TableCell>{row.productname}</TableCell>
                    <TableCell>{row.price}</TableCell>
                    <TableCell>{row.producttype}</TableCell>

                  
                    <Button onClick={() => history.push('/modificaProdotti?id='+row.id)}>Modifica</Button>
                    <Button onClick={() => doDelete(row.id)}>Elimina</Button>
                    
                    </TableRow>

                ))}
                </TableBody>
            </Table>
            </TableContainer>}
            <form style={{width: '600px', justifyContent:"center", alignItems:"center",display: "flex", flexDirection: "row"}} onSubmit={handleSubmit(doInsert)}>
                    <Grid style={{marginTop:"10px"}} >
                        <FormControl>
                            <InputLabel>Nome Prodotto</InputLabel>
                            <Input
                            {...register("productName")}
                            type='text'
                            />
                        </FormControl>
                        <FormControl>
                            <InputLabel>Prezzo</InputLabel>
                            <Input
                            {...register("price")}
                            type='text'
                            />
                        </FormControl>
                        <FormControl>
                            <InputLabel>Tipologia Prodotto</InputLabel>
                            <Input
                            {...register("productType")}
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

export default Prodotti