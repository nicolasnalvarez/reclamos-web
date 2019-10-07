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
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import {FormGroup} from "@material-ui/core";

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column'
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 150
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2
    },
    button: {},
});

class ReclamoForm extends PureComponent {
    state = {
        selected: null,
        hasError: false
    };

    handleChange(value) {
        this.setState({selected: value});
    }

    handleClick() {
        this.setState({hasError: false});
        if (!this.state.selected) {
            this.setState({hasError: true});
        }
    }

    render() {
        const {classes} = this.props;
        const {selected, hasError} = this.state;
        return (
            <Container maxWidth='sm'>
                <FormGroup className={classes.root} aria-autocomplete='none'>
                    <FormControl className={classes.formControl} error={hasError}>
                        <InputLabel htmlFor='userType'>Tipo de usuario</InputLabel>
                        <Select
                            name='userType'
                            value={selected}
                            onChange={event => this.handleChange(event.target.value)}
                            input={<Input id='userType'/>}
                        >
                            <MenuItem value='duenio'>Dueño</MenuItem>
                            <MenuItem value='inquilino'>Inquilino</MenuItem>
                        </Select>
                        {hasError && <FormHelperText>Campo requerido!</FormHelperText>}
                    </FormControl>
                    <FormControl>
                        <h3>Ingrese su DNI</h3>
                        <TextField
                            id='outlined-dense'
                            label='Titulo'
                            margin='dense'
                            variant='outlined'
                        />
                    </FormControl>
                  <Button onClick={this.handleClick} fullWidth={false} variant='contained' color='primary'
                          size='small' className={classes.button}>
                    Submit
                  </Button>
                </FormGroup>
            </Container>
        );
    }
}

ReclamoForm.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ReclamoForm);