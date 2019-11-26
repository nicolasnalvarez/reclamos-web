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
    }
}));

const Reclamo = ({dataReclamo, raised = false, cardWidth}) => {
    const classes = useStyles();
    const isEmptyOrNull =  !dataReclamo || Object.keys(dataReclamo).size === 0;
    const randomNum = Math.floor(Math.random()*3) + 1;

    const changeStatus = () => {

    };

    // {"id":1002,"documento":"DNI30108780","idEdificio":1,"nombreEdificio":"SLS Puerto Madero","direccionEdificio":"Mogliani 425","idUnidad":6,"numeroUnidad":"1","pisoUnidad":"10","ubicacion":"","descripcion":"Un nuevo reclamo.","estado":"nuevo"}

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
                {/*<Typography style={{color: 'blue'}} gutterBottom>*/}
                {/*    <strong>Estado: </strong>{_.startCase(dataReclamo.estado)}*/}
                {/*</Typography>*/}
                <Typography className={classes.title} gutterBottom>
                    <strong>Edificio:</strong> {dataReclamo.idEdificio} - {dataReclamo.nombreEdificio} - {dataReclamo.direccionEdificio}
                </Typography>
                <Typography className={classes.title} gutterBottom>
                    <strong>Unidad:</strong> {dataReclamo.idUnidad} - Número {dataReclamo.numeroUnidad} - Piso {dataReclamo.pisoUnidad}
                </Typography>
                <Typography className={classes.title} gutterBottom>
                    <strong>Descripción:</strong><br/> {dataReclamo.descripcion}
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={changeStatus} variant='contained' color='primary' size='small'>Cambiar estado</Button>
            </CardActions>
        </Card>
    )};

export default Reclamo;