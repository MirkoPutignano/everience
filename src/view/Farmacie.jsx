import React, { useEffect } from 'react'
import { Grid, Table, TableRow, TableCell, TableContainer, TableHead, TableBody, Paper} from '@mui/material'
import { useState, setStates, states } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'
import { insertPharmacy } from 'service/PharmacyService'
import { deletePharmacy } from 'service/PharmacyService'
import { useDispatch } from 'react-redux'
import { insertAction } from 'redux/action'
import { pharmacy } from 'service/PharmacyService'
import { FormControl, Input, InputLabel, Button, Snackbar, Slide} from '@mui/material'
import MuiAlert from '@mui/lab/Alert'

function Farmacie() {

    const history = useHistory()
    const insertDispatch = useDispatch()
    const { register, handleSubmit} = useForm()
    const [states, setStates] = React.useState({
        showPassword: false,
        snackbar: false
    })
    

    const doDelete = data => {
        deletePharmacy(data).then(resp =>{
            if(resp.data){
                
            }else{
             setStates({...states,snackbar:true}) 
            }
        })
    }

    const doInsert = data => {
        insertPharmacy(data).then(resp =>{
            if(resp.data){ 
                insertDispatch(insertAction(resp.data));
                setStates({...states,snackbar:true})
            }else{
             console.log("cicciobiscotto") 
            }
        })
    }

    var [pharmacyList, setPharmacy] = useState([]);

    useEffect(()=> {
        pharmacy().then((resp)=> {
            setPharmacy(resp.data)});
        },[pharmacyList]);
    return (
        <Grid container alignItems='center' justifyContent='center'>
            {<TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow >
                    <TableCell style={{fontWeight:'bold'}}>Id Farmacia</TableCell>
                    <TableCell style={{fontWeight:'bold'}}>Nome Farmacia</TableCell>
                    <TableCell style={{fontWeight:'bold'}}>Città</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {pharmacyList.map((row) => (
                    <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row" >{row.id}</TableCell>
                    <TableCell>{row.pharmacyName}</TableCell>
                    <TableCell>{row.city}</TableCell>
                  
                    <Button onClick={() => history.push('/modificaFarmacie?id='+row.id)}>Modifica</Button>
                    <Button onClick={() => doDelete(row.id)}>Elimina</Button>
                    </TableRow>

                ))}
                </TableBody>
            </Table>
            </TableContainer>}
            <form style={{width: '600px', justifyContent:"center", alignItems:"center",display: "flex", flexDirection: "row"}} onSubmit={handleSubmit(doInsert)}>
                    <Grid style={{marginTop:"10px"}} >
                        <FormControl>
                            <InputLabel>Nome Farmacia</InputLabel>
                            <Input
                            {...register("pharmacyName")}
                            type='text'
                            />
                        </FormControl>
                        <FormControl>
                            <InputLabel>Città</InputLabel>
                            <Input
                            {...register("city")}
                            type='text'
                            />
                        </FormControl>
                     <Button variant="contained" color="secondary" type="submit">Inserisci</Button>
                    </Grid>
                </form>
            <Button onClick={() => history.push('/')}>Indietro</Button>
            <Snackbar anchorOrigin={{vertical:'top',horizontal:'center'}} 
                open={states.snackbar} 
                onClose={() => setStates({...states,snackbar:false})} 
                autoHideDuration={3000} 
                TransitionComponent={Slide} >
                    <MuiAlert variant="filled" severity="success" elevation={6}>Operazione avvenuta con successo</MuiAlert>
            </Snackbar>
        </Grid>

    );
}

export default Farmacie