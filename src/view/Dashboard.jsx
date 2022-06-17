import React from 'react'
import { useDispatch } from 'react-redux'
import { logoutAction } from 'redux/action'
import { Grid } from '@mui/material'
import Navbar from 'component/Navbar'
import { navbarPath, printRoutes } from 'router'
import { getAvatar } from 'service/UserService'
import { getUserName } from 'utils/jwt.util'

import logo from 'assets/logo.png'

function DashboardPage() {

    const [avatar, setAvatar] = React.useState('')

    const logout = useDispatch()
    const nome = getUserName()

    getAvatar().then(resp => setAvatar(resp.data))

    return (
        <Grid container alignItems='center' justifyContent='center'>
            <Navbar logo={logo} navLinks={navbarPath}
                avatar={avatar}
                user={nome} logOut={() => logout(logoutAction())} />
            {printRoutes()}
        </Grid>
    );
}

export default DashboardPage