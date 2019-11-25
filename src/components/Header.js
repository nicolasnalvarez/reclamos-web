import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CustomizedMenus from './CustomizedMenus';
import {withRouter} from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange } from '@material-ui/core/colors';
import Logo from '../images/logo.png';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        fontSize: 30,
        cursor: 'pointer'
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    },
    orangeAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: deepOrange[500]
    }
}));

const Header = ({title, isLoggedIn, history, onUserLogOut, currentUser}) => {
    const classes = useStyles();

    const checkLogOut = () => {
        if (isLoggedIn) {
            history.push('/home');
            onUserLogOut();
        }
    };

    const menuOptions = isLoggedIn
        ? [
            {iconName: 'post_add', text: 'Nuevo Reclamo', subText: 'Aquí podrá generar un nuevo reclamo para su unidad o edificio', pathTo: '/reclamo'},
            {iconName: 'search', text: 'Buscar Reclamo', subText: 'Podrá buscar uno o varios reclamos según cierto criterio', pathTo: '/busquedareclamos'},
            {iconName: 'list_alt', text: 'Mis Reclamos', subText: 'La lista de los reclamos que fueron generados por usted', pathTo: '/reclamos'},
            {iconName: 'exit_to_app', text: 'Logout', subText: 'La lista de los reclamos que fueron generados por usted', pathTo: '/home', onClick: checkLogOut}
        ]
        :[
            {iconName: 'search', text: 'Buscar Reclamo', subText: 'Podrá buscar uno o varios reclamos según cierto criterio', pathTo: '/busquedareclamos'},
            {iconName: 'open_in_browser', text: 'Login', subText: 'La lista de los reclamos que fueron generados por usted', pathTo: '/login'}
        ];

    const redirectToHome = () => {
        history.push('/');
    };

    return (
        <AppBar component='header' position='static' className={classes.root}>
            <Toolbar>
                <img src={Logo} height={50} alt='Logo'/>
                <Typography onClick={redirectToHome} variant='h1' className={classes.title}>
                    {title}
                </Typography>
                <CustomizedMenus menuOptions={menuOptions} checkLogOut={checkLogOut} isLoggedIn={isLoggedIn}/>
                {currentUser && <Avatar className={classes.orangeAvatar}>{currentUser.nombre[0].toUpperCase()}</Avatar>}
            </Toolbar>
        </AppBar>
)};

export default withRouter(Header);