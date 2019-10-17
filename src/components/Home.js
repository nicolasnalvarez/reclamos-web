import React from 'react';
import {Container} from "@material-ui/core";
import './Home.scss';
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";

const useStyles = makeStyles({
    card: {
        maxWidth: 545,
    },
    media: {
        height: 240,

    },
});

const Home = props => {
    const classes = useStyles();

    return (
        <Container component='main' className='homeContainer'>
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image="http://clubdecampoelpaso.com.ar/consorcio/wp-content/uploads/2017/07/images.jpg"
                        title="Sistema de generación de reclamos"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h3" component="h2">
                            Bienvenido!
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Acá un texto explicando brevemente de qué se trata este sitio web en relación a los reclamos, pensando siempre que esta es la home
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                        Generar Reclamo
                    </Button>
                    <Button size="small" color="primary">
                        Mis Reclamos
                    </Button>
                </CardActions>
            </Card>
        </Container>
)};

export default Home;