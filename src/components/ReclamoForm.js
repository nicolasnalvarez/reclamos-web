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
        marginTop: theme.spacing(2)
    }
});

class ReclamoForm extends PureComponent {
    static propTypes = {
        classes: PropTypes.object.isRequired
    };

    state = {
        selected: 'Dueño',
        hasError: false,
        dni: '',
        userType: ''
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
        const {selected, hasError, dni} = this.state;
        return (
            <Container maxWidth='sm'>
                <Paper elevation={4} className={classes.formSubcontainer}>
                    <form>
                        <FormGroup className={classes.root} aria-autocomplete='none'>
                            <FormControl className={classes.formControl} error={hasError}>
                                <InputLabel htmlFor='userType'>Tipo de usuario</InputLabel>
                                <Select
                                    name='userType'
                                    value={selected}
                                    onChange={this.handleChange('userType')}
                                    input={<Input id='userType'/>}
                                >
                                    <MenuItem value='duenio'>Dueño</MenuItem>
                                    <MenuItem value='inquilino'>Inquilino</MenuItem>
                                </Select>
                                {hasError && <FormHelperText>Campo requerido!</FormHelperText>}
                            </FormControl>
                        </FormGroup>
                        <FormGroup>
                            <TextField
                                id='dni'
                                label='DNI'
                                margin='normal'
                                variant='standard'
                                helperText='Sólo números, ejemplo: 34531922'
                                placeholder='Por favor, ingrese su DNI'
                                className={classes.formControl}
                                value={dni}
                                name='dni'
                                onChange={this.handleChange('dni')}
                                error={!this.isValidNumber}
                            />
                        </FormGroup>
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