import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import WorkIcon from '@material-ui/icons/Work';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';

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
    }
});

class Reclamos extends PureComponent {
    // static propTypes = {
    //     reclamos: PropTypes.array.isRequired
    // };

    state = {
        selected: 'Dueño',
        reclamos: [],
    };

    componentDidMount() {
        fetch('http://localhost:8080/reclamos')
          .then(response => response.json())
          .then(reclamos => {
                console.log(reclamos);
                this.setState({ reclamos })
          });

        // Solo para probar, no debería recibir reclamos como prop sino usando el response del fetch
        // this.setState({ reclamos: this.props.reclamos })
      }

    render() {
        const {titulo, classes} = this.props;
        const {reclamos} = this.state;

        return (
            <Container className='topContent' component='main' title='Lista de Reclamos' maxWidth='lg'>
              <h2>{titulo}</h2>
                <List style={{border: '1px solid grey'}} className={classes.root}>
                    {
                        reclamos.map(({id, documento, idEdificio, idUnidad, ubicacion, descripcion, estado}) =>
                            <ListItem key={id} alignItems={3} title={'sarasa'}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <WorkIcon/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={`${id} - ${idEdificio}`} secondary={
                                    <>
                                        <Typography
                                            component='p'
                                            variant='body2'
                                            className={classes.inline}
                                            color='textPrimary'
                                        >
                                            Estado: {_.startCase(estado)}
                                        </Typography>
                                        <Typography
                                            component='p'
                                            variant='body2'
                                            className={classes.inline}
                                            color='textPrimary'
                                        >
                                            Ubicacion: {ubicacion}
                                        </Typography>
                                        {descripcion}
                                    </>
                                } />
                                <Divider variant='inset' component='li' />
                            </ListItem>
                        )
                    }
                </List>
            </Container>
        );
    }
}

export default withStyles(styles)(Reclamos);