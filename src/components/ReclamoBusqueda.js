import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Paper from "@material-ui/core/Paper";
import Reclamo from "./Reclamo";

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column'
    },
    formControl: {
        marginTop: 10,
        minWidth: 350
    },
    button: {
        marginTop: theme.spacing(2)
    },
    formSubcontainer: {
        padding: theme.spacing(2),
        marginTop: theme.spacing(2)
    },
    reclamoContainer: {
        marginTop: theme.spacing(5)
    }
});

class ReclamoBusqueda extends PureComponent {
    static propTypes = {
        classes: PropTypes.object.isRequired
    };

    state = {
        idReclamoBuscado: '',
        hasError: false,
        reclamoActual: null
    };

    handleChange = name => ({ target: {value} }) => {
        this.setState({
            [name]: value,
            hasError: !this.isValidNumber(value)
        });
    };

    buscarReclamo = () => {
        fetch(`http://localhost:8080/reclamo/${this.state.idReclamoBuscado}`)
            .then(response => response.json())
            .then(reclamoActual => {
                console.log(reclamoActual);
                this.setState({ reclamoActual })
            });
    };

    isValidNumber = number => /^[\d]+$/.test(number);

    handleClick = () => {
        if (!this.state.hasError && !!this.state.idReclamoBuscado)
            this.setState({
                reclamoActual: {
                    id: '01401958',
                    documento: '40019302',
                    idEdificio: '2',
                    idUnidad: '4',
                    ubicacion: "Griveo 2030, CABA",
                    descripcion: 'Descripción del reclamo 3 recontra super mega archi larga con un montón de cosas adentro para ver como se ve acá, porque si se ve feo o rompe cagamos fuego',
                    estado: 'enProceso'
                }
            });
            this.buscarReclamo();
    };

    render() {
        const {classes} = this.props;
        const {idReclamoBuscado, hasError, reclamoActual} = this.state;

        return (
            <Container component='main' maxWidth='md'>
                <Paper elevation={4} className={classes.formSubcontainer}>
                    <form>
                        <TextField
                            id='dni'
                            label='ID de reclamo'
                            margin='normal'
                            variant='standard'
                            helperText='Sólo números, ejemplo: 93492384'
                            placeholder='Por favor, ingrese el código de reclamo'
                            className={classes.formControl}
                            value={idReclamoBuscado}
                            name='idReclamoBuscado'
                            error={hasError}
                            onChange={this.handleChange('idReclamoBuscado')}
                        />
                    </form>
                    <Button onClick={this.handleClick} variant='contained' color='primary'
                            size='small' className={classes.button}>
                        Buscar reclamo
                    </Button>

                    {reclamoActual &&
                        <div className={classes.reclamoContainer}>
                            <Reclamo dataReclamo={reclamoActual}/>
                        </div>
                    }
                </Paper>
            </Container>
        );
    }
}

export default withStyles(styles)(ReclamoBusqueda);