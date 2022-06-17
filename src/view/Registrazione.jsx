import React from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { insert } from 'service/InsertService'
import { useDispatch } from 'react-redux'
import { insertAction } from 'redux/action'
import { Grid, FormControl, Input, InputLabel, InputAdornment, IconButton, FormHelperText, Button, Snackbar, Slide } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Visibility, VisibilityOff, AccountCircle } from '@mui/icons-material'
import MuiAlert from '@mui/lab/Alert'

import cardBackground from 'assets/stampa-serigrafica.png'
import logo from 'assets/logo_blu.png'


const style = makeStyles({
    gridContainer: {
        minHeight: '100vh',
        minWidth: '100vw',
        '&:before': {
            content: '""',
            background: `url(${cardBackground}) center`,
            backgroundSize: 'contain',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            opacity: 0.4,
            position: 'absolute',
            zIndex: -1
        }
    },
    gridLogin: {
        height: '70vh',
        width: 'max-content',
        justifyContent:"center",
    },
    gridInput:{
        height: 80,
        justifyContent:"center",
        alignItems:"center"
    },
    button: {
        margin: 5,
        width: '75%'
    },
    logo:{
        height: 56,
        marginBottom:"20px",
        backgroundSize:"0",
        width: '100%'
    }

})


function Registrazione(){

    const history = useHistory()
    const insertDispatch = useDispatch()
    const { register, handleSubmit, formState: {errors} } = useForm()
    const [states, setStates] = React.useState({
        showPassword: false,
        snackbar: false
    })
    const classes = style()

    const doInsert = data => {
        insert(data).then(resp =>{
            if(resp.data){ 
                insertDispatch(insertAction(resp.data))
            }else{
                setStates({...states,snackbar:true})
            }
        })
    }
    return (
        <Grid container alignItems='center' justifyContent='center'>
             <Grid container alignItems='center' justifyContent='center' className={classes.gridContainer}>
            <Grid container className={classes.gridLogin}>
                <form style={{width: '600px', justifyContent:"center", alignItems:"center",display: "flex", flexDirection: "column"}} onSubmit={handleSubmit(doInsert)}>
                   
                        <img 
                        className={classes.logo} 
                        src={logo} alt="Logo"/>
            
                    <Grid style={{marginTop:"10px"}} className={classes.gridInput}>
                        <FormControl>
                            <InputLabel error={errors.user ? true : false}>Username</InputLabel>
                            <Input
                                {...register("user",{required: 'Campo obbligatorio', pattern:{ value: /^([A-Za-z ])+$/, message:"Solo lettere"}})}
                                error={errors.user ? true : false}
                                autoFocus
                                type='text'
                                endAdornment={
                                    <InputAdornment position='end'>
                                        <IconButton tabIndex={-1} style={{backgroundColor: 'transparent', cursor:'default'}}>
                                            <AccountCircle />
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            <FormHelperText error>{errors.user ? errors.user.message : ""}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid   className={classes.gridInput}>
                        <FormControl>
                            <InputLabel error={errors.password ? true : false}>Password</InputLabel>
                            <Input
                                {...register("password",{required: 'Campo obbligatorio', minLength:{ value:4, message:'Minimo 4 caratteri'}})}
                                error={errors.password ? true : false}
                                type={states.showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position='end'>
                                        <IconButton tabIndex={-1}
                                        onMouseDown={() => setStates({...states,showPassword:true})}
                                        onMouseUp={() => setStates({...states,showPassword:false})}>
                                            {states.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            <FormHelperText error>{errors.password ? errors.password.message : ""}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid style={{display:"flex", justifyContent: "space-between"}} className={classes.gridInput}>
                        <Button className={classes.button} variant="contained" color="secondary" type="submit">registrati</Button>
                    </Grid>
                </form>
            </Grid>
            <Snackbar anchorOrigin={{vertical:'top',horizontal:'center'}} 
                open={states.snackbar} 
                onClose={() => setStates({...states,snackbar:false})} 
                autoHideDuration={3000} 
                TransitionComponent={Slide} >
                    <MuiAlert variant="filled" severity="error" elevation={6}>Registrazione fallita</MuiAlert>
                </Snackbar>
        </Grid>
            <Grid>
                <Button onClick={() => history.push("/")} >Torna al login</Button>
            </Grid>
        </Grid>
    )
}

export default Registrazione