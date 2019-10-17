import React, {PureComponent} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import CustomizedMenus from './CustomizedMenus';
import {Link} from "react-router-dom";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        fontSize: 30
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    }
}));

const Header = ({title, isLoggedIn}) => {
    const classes = useStyles();
    const menuOptions = isLoggedIn
        ? [
            {iconName: 'post_add', text: 'Nuevo Reclamo', subText: 'Aquí podrá generar un nuevo reclamo para su unidad o edificio', pathTo: '/reclamo'},
            {iconName: 'search', text: 'Buscar Reclamo', subText: 'Podrá buscar uno o varios reclamos según cierto criterio', pathTo: '/busquedareclamos'},
            {iconName: 'list_alt', text: 'Mis Reclamos', subText: 'La lista de los reclamos que fueron generados por usted', pathTo: '/reclamos'}
        ]
        :[{iconName: 'search', text: 'Buscar Reclamo', subText: 'Podrá buscar uno o varios reclamos según cierto criterio', pathTo: '/busquedareclamos'}];

    return (
        <AppBar component='header' position='static' className={classes.root}>
            <Toolbar>
                <Typography variant='h1' className={classes.title}>
                    {title}
                </Typography>
                <CustomizedMenus menuOptions={menuOptions}/>
                <Button color='inherit'><Link className={classes.link} to="/login">Log in</Link></Button>
            </Toolbar>
        </AppBar>
)};

export default Header;