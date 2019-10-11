import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Card from "@material-ui/core/Card";
import _ from 'lodash';

const useStyles = makeStyles(theme => ({
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    }
}));

const Reclamo = ({dataReclamo}) => {
    const classes = useStyles();
    console.log('dataReclamo:   ', dataReclamo)
    const isEmptyOrNull =  !dataReclamo || Object.keys(dataReclamo).size === 0;

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    <strong>Edificio:</strong> {dataReclamo.idEdificio}
                </Typography>
                <Typography variant="h5" component="h2">
                    ID: {dataReclamo.id}
                </Typography>
                <Typography style={{color: 'blue'}} className={classes.pos} color="textSecondary">
                    <strong>Estado: </strong>{_.startCase(dataReclamo.estado)}
                </Typography>
                <Typography variant="body2" component="p">
                    {dataReclamo.descripcion}
                    <br />
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    )};

export default Reclamo;