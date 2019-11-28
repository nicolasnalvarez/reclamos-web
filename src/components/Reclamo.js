import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Card from '@material-ui/core/Card';
import _ from 'lodash';
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import AssignmentIcon from '@material-ui/icons/Assignment';
import { green, pink, blue } from '@material-ui/core/colors';
import * as rp from 'request-promise';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import PersonIcon from '@material-ui/icons/Person';
import * as PropTypes from 'prop-types';

const ESTADOS = ['abierto', 'enProceso', 'desestimado', 'anulado', 'terminado'];

const useStyles = makeStyles(theme => ({
    card: {
        minWidth: 275,
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        paddingBottom: '0px',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    green: {
        backgroundColor: green[500]
    },
    pink: {
        backgroundColor: pink[500]
    },
    blue: {
        backgroundColor: blue[500]
    },
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    }
}));

function SimpleDialog(props) {
    const classes = useStyles();
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = value => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby='simple-dialog-title' open={open}>
            <DialogTitle id='simple-dialog-title'>Por favor, seleccione el nuevo estado</DialogTitle>
            <List>
                {ESTADOS.map(estado => (
                    <ListItem style={{ backgroundColor: estado === selectedValue? '#00d4ff':'inherit' }} button onClick={() => handleListItemClick(estado)} key={estado}>
                        <ListItemAvatar>
                            <Avatar className={classes.avatar}>
                                <PersonIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={_.startCase(estado)} />
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

const Reclamo = ({dataReclamo, raised = false, cardWidth, esAdmin = false}) => {
    const classes = useStyles();
    // const isEmptyOrNull =  !dataReclamo || Object.keys(dataReclamo).size === 0;
    const randomNum = Math.floor(Math.random() * 3) + 1;
    const [open, setOpen] = React.useState(false);
    const [statusSelected, setStatusSelected] = React.useState(ESTADOS[0]);

    const changeStatus = () => {
        setOpen(true);
    };

    const handleClose = value => {
        setOpen(false);
        setStatusSelected(value);

        // rp({
        //     method: 'GET',
        //     uri: `http://localhost:8080/unidades/personas/${tipoUsuario}/${dni}/edificios/${edificioSelected}`,
        //     headers: {'content-type': 'application/json'},
        //     json: true
        // })
        //     .then(response => {
        //         this.setState({ unidades: response, waiting: false });
        //         // setRegisterError(false);
        //     })
        //     .catch( err => {
        //         console.log('mal con: ' + err);
        //         this.setState({ waiting: false });
        //     })
    };

    return (
        <Card raised={raised} style={{width: cardWidth? `${cardWidth}px` : 'inherit'}} className={classes.card}>
            <CardHeader
                avatar={
                    <Avatar aria-label='recipe' className={randomNum === 1? classes.green : randomNum === 2? classes.pink : classes.blue}>
                        <AssignmentIcon/>
                    </Avatar>
                }
                title={`Reclamo N°${dataReclamo.id}`}
                subheader={'Estado: ' + _.startCase(dataReclamo.estado)}
            />
            <CardMedia
                className={classes.cardMedia}
                image="https://source.unsplash.com/random"
                title="Image title"
            />
            <CardContent className={classes.cardContent}>
                <Typography className={classes.title} gutterBottom>
                    <strong>Edificio:</strong> {dataReclamo.idEdificio} - {dataReclamo.nombreEdificio} - {dataReclamo.direccionEdificio}
                </Typography>
                <Typography className={classes.title} gutterBottom>
                    <strong>Unidad:</strong> {dataReclamo.idUnidad} - Número {dataReclamo.numeroUnidad} - Piso {dataReclamo.pisoUnidad}
                </Typography>
                <Typography className={classes.title} gutterBottom>
                    <strong>Descripción:</strong><br/> {dataReclamo.descripcion}
                </Typography>
                <SimpleDialog selectedValue={statusSelected} open={open} onClose={handleClose} />
            </CardContent>
            {!esAdmin && <CardActions>
                <Button onClick={changeStatus} variant='contained' color='primary' size='small'>Cambiar estado</Button>
            </CardActions>}
        </Card>
    )};

export default Reclamo;