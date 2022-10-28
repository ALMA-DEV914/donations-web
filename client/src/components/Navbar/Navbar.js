import React from 'react'
import { AppBar, Avatar, Toolbar, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom'
import useStyles from "./styles";
import logo from '../../images/logo.png';

const Navbar = () => {
    const classes = useStyles()

    const user = null;
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
        <div className={classes.brandContainer}>
            <Typography component={Link} to='/' className={classes.heading} variant='h2'></Typography>
            <img className={classes.image} src={logo} height='60' alt="logo"/>
        </div>
        <Toolbar className={classes.toolbar}>
            {user ? (
                <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user.result.name} src={user.rrsult.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                    <Typography className={classes.userName}variant='h3'>{user.result.name}</Typography>
                    <Button variant='contained' className={classes.logout} color='secondary'> LOGOUT</Button>
                </div>
            ) : (
                <Button component={Link} to='/auth' variant='contained' color='primary'>SIGN IN</Button>

            )}
        </Toolbar>
      </AppBar>
  )
}

export default Navbar
