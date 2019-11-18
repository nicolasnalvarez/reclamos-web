import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Reclamo from "./Reclamo";
import './Reclamos.scss';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column'
    },
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

class Reclamos extends PureComponent {
    state = {
        selected: 'Dueño',
        reclamos: [],
    };

    componentDidMount() {
        fetch('http://localhost:8080/reclamos/all/'+this.props.currentUser.dni)
          .then(response => response.json())
          .then(reclamos => {
              if (reclamos.error || reclamos.status === 500)
                  throw new Error(reclamos.message);

              console.log(reclamos);
              this.setState({ reclamos })
          })
          .catch(err => {
              console.log(`Problemas al buscar la lista de reclamos: ${err.message}`);
          })
      }

    render() {
        const {titulo, classes} = this.props;
        const {reclamos} = this.state;

        return (
            <Container component='main' title='Lista de Reclamos' maxWidth='lg'>
                <div className={classes.paper}>
                    <Typography align={'center'} component='h1' variant='h5'>
                        {titulo}
                    </Typography>
                    <List dense className={classes.root}>
                        {
                            reclamos.map(({id, documento, idEdificio, idUnidad, ubicacion, descripcion, estado}) =>
                                <ListItem key={id} alignItems={6} title='Reclamos'>
                                    <Reclamo cardWidth={600} raised={true} dataReclamo={{id, documento, idEdificio, idUnidad, ubicacion, descripcion, estado}}/>
                                    <Divider variant='inset' component='li' />
                                </ListItem>
                            )
                        }
                    </List>
                </div>
            </Container>
        );
    }
}

export default withStyles(styles)(Reclamos);