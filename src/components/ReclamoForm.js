import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import {FormGroup} from '@material-ui/core';
import Paper from "@material-ui/core/Paper";

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
        marginTop: theme.spacing(2),
        minWidth: 450,
        minHeight: 300
    }
});

class ReclamoForm extends PureComponent {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        currentUser: PropTypes.object
    };

    state = {
        selected: 'Dueño',
        hasError: false,
        userType: '',
        edificios: [],
        unidades: []
    };

    componentDidMount() {
        const {tipoUsuario, dni} = this.props.currentUser;

        // fetch(`localhost:8080/edificios/personas/${tipoUsuario}/${dni}`,
        //     {
        //         method: 'GET',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     })
        //     .then(response => response.json())
        //     .then(cleanResponse => {
        //         if (cleanResponse.status === 201) {
        //             this.setState({edificios: cleanResponse.body});
        //         }
        //     })
        //     .catch(error => console.error('Error:', error));
        this.setState({edificios: [
                {id: '5', nombre: 'Edificio Salamandra', direccion: 'Junin 233'},
                {id: '6', nombre: 'Edificio Las Salinas', direccion: 'Chile 2040'}
            ]
        });
    }

    onChangeEdificio = edificioSelected => {
        const {tipoUsuario, dni} = this.props.currentUser;

        fetch(`localhost:8080/unidades/personas/${tipoUsuario}/${dni}/edificios/${this.state.edificioSelected.id}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(cleanResponse => {
                if (cleanResponse.status === 201) {
                    this.setState({edificios: cleanResponse.body});
                }
            })
            .catch(error => console.error('Error:', error));
    };

    handleChange = name => ({ target: {value} }) => {
        // if (/^[\d]+$/.test(value) || value === '')
            this.setState({
                [name]: value
            });
    };

    isValidNumber = number => /^[\d]+$/.test(number);

    handleClick = () => {
        this.setState({hasError: false});
        if (!this.state.selected) {
            this.setState({hasError: true});
        }
    };

    render() {
        const {classes} = this.props;
        const {selected, hasError, edificios, unidades} = this.state;
        return (
            <Container component='main' maxWidth='lg'>
                <Paper elevation={4} className={classes.formSubcontainer}>
                    <form>
                        <FormGroup className={classes.root} aria-autocomplete='none'>
                            <FormControl className={classes.formControl} error={hasError}>
                                <InputLabel htmlFor='edificios'>Edificios</InputLabel>
                                <Select
                                    name='edificios'
                                    id='edificios'
                                    value={selected}
                                    onChange={this.handleChange('userType')}
                                    input={<Input id='userType'/>}
                                >
                                {
                                    edificios.map(edificio => <MenuItem key={edificio.id} value='duenio'>{edificio.nombre}</MenuItem>)
                                }
                                </Select>
                                {hasError && <FormHelperText>Campo requerido!</FormHelperText>}
                            </FormControl>
                        </FormGroup>
                        {/*<FormGroup>*/}
                        {/*    <TextField*/}
                        {/*        id='dni'*/}
                        {/*        label='DNI'*/}
                        {/*        margin='normal'*/}
                        {/*        variant='standard'*/}
                        {/*        helperText='Sólo números, ejemplo: 34531922'*/}
                        {/*        placeholder='Por favor, ingrese su DNI'*/}
                        {/*        className={classes.formControl}*/}
                        {/*        value={dni}*/}
                        {/*        name='dni'*/}
                        {/*        onChange={this.handleChange('dni')}*/}
                        {/*        error={!this.isValidNumber}*/}
                        {/*    />*/}
                        {/*</FormGroup>*/}
                    </form>
                    <Button onClick={this.handleClick} variant='contained' color='primary'
                            size='small' className={classes.button}>
                        Buscar reclamo
                    </Button>
                </Paper>
            </Container>
        );
    }
}

export default withStyles(styles)(ReclamoForm);