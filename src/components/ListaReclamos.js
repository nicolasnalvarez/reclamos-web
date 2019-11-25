import React, {PureComponent} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Reclamo from "./Reclamo";
import CircularProgress from "@material-ui/core/CircularProgress";
import './Reclamos.scss';
import '../App.scss';
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
    // root: {
    //     display: 'flex',
    //     flexWrap: 'wrap',
    //     flexDirection: 'column'
    // },
    formControl: {
        marginTop: 20,
        minWidth: 150
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    },
    button: {
        marginTop: theme.spacing(2)
    },
    formSubcontainer: {
        padding: theme.spacing(2),
        marginTop: theme.spacing(2)
    },
    paper: {
        margin: theme.spacing(4, 0, 4, 0),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
});

class ListaReclamos extends PureComponent {
    state = {
        selected: 'Dueño',
        reclamos: [],
        isLoading: true
    };

    componentDidMount() {
        fetch('http://localhost:8080/reclamos/all/'+this.props.currentUser.dni)
          .then(response => response.json())
          .then(reclamos => {
              if (reclamos.error || reclamos.status === 500)
                  throw new Error(reclamos.message);

              setTimeout(() => this.setState({ reclamos, isLoading: false }), 1500);
          })
          .catch(err => {
              console.log(`Problemas al buscar la lista de reclamos: ${err.message}`);
              this.setState({ isLoading: false });
          })
      }

    render() {
        const {titulo, classes} = this.props;
        const {reclamos, isLoading} = this.state;
        console.log(`LISTA DE RECLAMOS: ${JSON.stringify(reclamos)}`);

        return (
            <Container className='topCenterContent' component='main' title='Lista de Reclamos' maxWidth='md'>
                {isLoading && <CircularProgress className='spinner' size={50} thickness={2}/>}
                <div className={classes.paper}>
                    <Typography align='center' component='h2' variant='h2'>
                        {titulo}
                    </Typography>
                    {   reclamos && reclamos.length > 0 &&
                        <Grid container spacing={2} className='reclamosList'>
                            {
                                reclamos.map(dataReclamo =>
                                    <Grid item xs={12} sm={6} md={6} key={`${dataReclamo.id}-${dataReclamo.idEdificio}-${dataReclamo.idUnidad}`} title='Reclamos'>
                                        <Reclamo dataReclamo={dataReclamo}/>
                                    </Grid>
                                )
                            }
                        </Grid>
                    }
                </div>
            </Container>
        );
    }
}

export default withStyles(styles)(ListaReclamos);