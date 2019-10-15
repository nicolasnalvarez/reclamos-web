import React, {PureComponent} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import CustomizedMenus from './CustomizedMenus';
import {Link} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
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
    <div className={classes.root}>
        <AppBar position='static'>
            <Toolbar>
                <CustomizedMenus menuOptions={menuOptions}/>
                <Typography variant='h6' className={classes.title}>
                    {title}
                </Typography>
                <Button color='inherit'><Link className={classes.link} to="/login">Log in</Link></Button>
            </Toolbar>
        </AppBar>
    </div>
)};

export default Header;