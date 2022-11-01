import React, { useState, useEffect } from 'react'
import { AppBar, Avatar, Toolbar, Typography, Button } from '@material-ui/core';
import { LOGOUT } from '../../constants/actionTypes';
import { Link } from 'react-router-dom'
import useStyles from "./styles";
import logo from '../../images/logo1.png';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    console.log(user);
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const logout = () => {
        dispatch({type: LOGOUT});

        history.push('/')
        setUser(null)
    }

    useEffect(() => {
        const token = user?.token;
        setUser(JSON.parse(localStorage.getItem('profile')))

    }, [location])
    
  return (
    <AppBar className={classes.appBar}  color="inherit">
        <div className={classes.brandContainer}>
            <Typography component={Link} to='/' className={classes.heading} variant='h2'>TheGivers</Typography>
            <img className={classes.image} src={logo} height='60' alt="logo"/>
        </div>
        <Toolbar className={classes.toolbar}>
            {user ? (
                <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                    <Typography className={classes.userName}variant='h5'>{user.result.name}</Typography>
                    <Button variant='contained' className={classes.logout} color='secondary' onClick={logout}> LOGOUT</Button>
                </div>
            ) : (
                <Button component={Link} to='/auth' variant='contained' color='primary'>SIGN IN</Button>

            )}
        </Toolbar>
      </AppBar>
  )
}

export default Navbar
