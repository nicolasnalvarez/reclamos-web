import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import CustomizedMenus from './CustomizedMenus';
import {Link, withRouter} from "react-router-dom";
import Icon from "@material-ui/core/Icon";

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
    }
}));

const Header = ({title, isLoggedIn, history, onUserLogOut}) => {
    const classes = useStyles();
    const menuOptions = isLoggedIn
        ? [
            {iconName: 'post_add', text: 'Nuevo Reclamo', subText: 'Aquí podrá generar un nuevo reclamo para su unidad o edificio', pathTo: '/reclamo'},
            {iconName: 'search', text: 'Buscar Reclamo', subText: 'Podrá buscar uno o varios reclamos según cierto criterio', pathTo: '/busquedareclamos'},
            {iconName: 'list_alt', text: 'Mis Reclamos', subText: 'La lista de los reclamos que fueron generados por usted', pathTo: '/reclamos'}
        ]
        :[{iconName: 'search', text: 'Buscar Reclamo', subText: 'Podrá buscar uno o varios reclamos según cierto criterio', pathTo: '/busquedareclamos'}];

    const redirectToHome = () => {
        history.push('/');
    };

    const checkLogOut = () => {
        if (isLoggedIn) {
            // event.preventDefault();
            history.push('/home');
            onUserLogOut();
        }
    };

    return (
        <AppBar component='header' position='static' className={classes.root}>
            <Toolbar>
                <Typography onClick={redirectToHome} variant='h1' className={classes.title}>
                    {title}
                </Typography>
                <CustomizedMenus menuOptions={menuOptions}/>
                <Button onClick={checkLogOut} color='inherit'>
                    {!isLoggedIn && <Link className={classes.link} to="/login">Log in</Link>}
                    {isLoggedIn && <span>Log out</span>}
                    <Icon style={{marginLeft: '3px'}}>{isLoggedIn? 'exit_to_app':'open_in_browser'}</Icon>
                </Button>
            </Toolbar>
        </AppBar>
)};

export default withRouter(Header);