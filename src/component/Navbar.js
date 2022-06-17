import React, { useEffect, useState } from 'react'
import { AppBar, Grid, Toolbar, Button, Avatar, IconButton, Menu, MenuItem } from '@mui/material'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types';

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
                <Grid container alignItems='center' justifyContent='center'>
                <Grid item xs={8}>
                    <Grid alignItems='center' justifyContent={'flex-start'} container>
                        <Grid xs={2} item >
                            <img src={props.logo} alt='Home' width={45} onClick={() => history.push('/')} style={{ cursor: 'pointer'}}/>
                        </Grid>
                        <Grid xs={8} item >
                            <Grid container alignItems='center' justifyContent='center'>
                                {props.navLinks.map((route,index) => <Button key={index} underline={'none'} onClick={() => history.push(route.path)} variant="contained" color='primary' disableElevation>{route.label}</Button>)}
                            </Grid>
                        </Grid>
                        <Grid item xs={2}>
                            <Grid container alignItems='center' justifyContent={'flex-end'}>
                                <IconButton onClick={(event) => setAnchor(event.currentTarget)}>
                                    <Avatar alt={`Ciao ${props.user}`}
                                     src={avatarImage}
                                     >{props.user}</Avatar>
                                </IconButton>
                                <Menu open={Boolean(anchor)} onClose={() => setAnchor(null)} anchorEl={anchor} keepMounted>
                                    <MenuItem onClick={() => history.push('/profile')}>Profilo</MenuItem>
                                    <MenuItem onClick={() => props.logOut()}>Log Out</MenuItem>
                                </Menu>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

Navbar.propTypes = {
    logo: PropTypes.any.isRequired,
    navLinks: PropTypes.arrayOf( PropTypes.shape({
        path: PropTypes.string,
        label: PropTypes.string
      })).isRequired,
    avatar: PropTypes.any,
    logOut: PropTypes.func.isRequired
}

export default Navbar