import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import './ReclamoForm.scss';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column'
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    formSubcontainer: {
        padding: theme.spacing(2),
        marginTop: theme.spacing(2),
        minWidth: 450,
        minHeight: 300
    },
    paper: {
        margin: theme.spacing(4, 0, 4, 0),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    menu: {
        width: 200,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    }
});

class ReclamoForm extends PureComponent {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        currentUser: PropTypes.object
    };

    state = {
        hasError: false,
        userType: '',
        edificios: [],
        unidades: [],
        formValues: {
            edificioSelected: '',
            unidadSelected: '',
            comentario: '',
            ubicacion: '',
            imagenes: []
        },
        altaReclamoStatusMessage: 'Reclamo generado exitosamente',
        altaReclamoSubmitted: false
    };

    // this.id = id;
    // this.piso = piso;
    // this.numero = numero;
    // this.habitado = habitado;
    // this.edificio = edificio;

    handleDelete = () => {
        alert('You clicked the delete icon.');
    };

    handleClick = () => {
        alert('You clicked the Chip.');
    };

    componentDidMount() {
        const currentUser = this.props.currentUser;
        console.log("usuario actual: " + JSON.stringify(this.props.currentUser));

        const tipoUsuario = currentUser.tipoUsuario;
        const dni = currentUser.dni;

        fetch(`http://localhost:8080/edificios/personas/${tipoUsuario}/${dni}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(cleanResponse => {
                console.log("edificios: " + cleanResponse);
                this.setState({edificios: cleanResponse});
            })
            .catch(error => console.error('Error:', error));
    }

    onChangeEdificio = edificioSelected => {
        const currentUser = this.props.currentUser;

        const tipoUsuario = 1;
        const dni = '35255211';
        if (currentUser) {
            const tipoUsuario = currentUser.tipoUsuario;
            const dni = currentUser.dni;
        }

        // fetch(`localhost:8080/unidades/personas/${tipoUsuario}/${dni}/edificios/${this.state.edificioSelected.id}`,
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

        this.setState({
            unidades: [
                {id: '100', piso: '5', numero: 'A', habitado: false},
                {id: '101', piso: '2', numero: 'B', habitado: true}
            ]
        });
    };

    handleChange = (name, onChangeValue) => ({ target: {value} }) => {
        // if (/^[\d]+$/.test(value) || value === '')
            this.setState({
                formValues: {
                    ...this.state.formValues,
                    [name]: value
                }
            });

        if (onChangeValue)
            onChangeValue(value);
    };

    onUploadImage = event => {
        console.log('image event', event);

        const imagenesU = this.state.formValues.imagenes;
        imagenesU.push({
            path: `C:\\imagenes\\${event.target.files[0].name}`,
            tipo: event.target.files[0].type
        });

        if (event.target && event.target.files) {
            this.setState({
                formValues: {
                    ...this.state.formValues,
                    imagenes: imagenesU
                }
            });
        }
    };

    isValidNumber = number => /^[\d]+$/.test(number);

    handleClick = () => {
        this.setState({hasError: false});
        if (!this.state.selected) {
            this.setState({hasError: true});
        }
    };

    altaReclamo = () =>  {
        const currentUser = this.props.currentUser;
        const formValues = this.state.formValues;

        const tipoUsuario = currentUser.tipoUsuario;
        const dni = currentUser.dni;

        // event.preventDefault();
        const newReclamo = {
            idEdificio: formValues.edificioSelected,
            idUnidad: formValues.unidadSelected,
            ubicacion: formValues.ubicacion,
            descripcion: formValues.comentario,
            documento: dni
        };

        this.setState({altaReclamoStatusMessage: 'Reclamo generado exitosamente'});

        console.log(JSON.stringify(newReclamo));

        fetch('http://localhost:8080/reclamos',
            {
                method: 'POST',
                body: JSON.stringify({reclamo: newReclamo, imagenes: formValues.imagenes}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(cleanResponse => {
                 this.setState({altaReclamoSubmitted: true})
            })
            .catch(error => console.error('Error:', error));
    };

    render() {
        const {classes} = this.props;
        const {formValues, hasError, edificios, unidades, altaReclamoSubmitted, altaReclamoStatusMessage} = this.state;

        // Buscar una mejor manera
        const canSubmit = formValues.edificioSelected && formValues.unidadSelected && formValues.comentario;

        return (
            <Container component='main' maxWidth='xs'>
                <CssBaseline/>
                <div className={classes.paper}>
                    <Typography component='h1' variant='h5'>
                        Aquí puede generar un nuevo reclamo
                    </Typography>
                    <form className={classes.form} onSubmit={() => {return false;}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                {/*<FormGroup className={classes.root} aria-autocomplete='none'>*/}
                                {/*    <FormControl className={classes.formControl} error={hasError}>*/}
                                {/*        <InputLabel htmlFor='edificios'>Edificios</InputLabel>*/}
                                {/*        <Select*/}
                                {/*            name='edificios'*/}
                                {/*            id='edificios'*/}
                                {/*            value={formValues.edificioSelected}*/}
                                {/*            onChange={this.handleChange('edificioSelected', this.onChangeEdificio)}*/}
                                {/*            input={<Input id='edificio'/>}*/}
                                {/*        >*/}
                                {/*            {*/}
                                {/*                edificios.map(edificio => <MenuItem key={edificio.id} value='duenio'>{edificio.nombre}</MenuItem>)*/}
                                {/*            }*/}
                                {/*        </Select>*/}
                                {/*        {hasError && <FormHelperText>Campo requerido!</FormHelperText>}*/}
                                {/*    </FormControl>*/}
                                {/*</FormGroup>*/}
                                <TextField
                                    id='edificios'
                                    select
                                    label='Edificios'
                                    variant='outlined'
                                    fullWidth
                                    value={formValues.edificioSelected}
                                    onChange={this.handleChange('edificioSelected', this.onChangeEdificio)}
                                    // SelectProps={{
                                    //     MenuProps: {
                                    //         className: classes.menu,
                                    //     },
                                    // }}
                                    helperText='Seleccione un edificio'
                                    autoFocus
                                    required
                                >
                                    {
                                        edificios.map(edificio => <MenuItem key={edificio.id} value={edificio.id}>{edificio.nombre}</MenuItem>)
                                    }
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id='unidades'
                                    select
                                    label='Unidades'
                                    variant='outlined'
                                    fullWidth
                                    value={formValues.unidadSelected}
                                    onChange={this.handleChange('unidadSelected')}
                                    disabled={!formValues.edificioSelected}
                                    // SelectProps={{
                                    //     MenuProps: {
                                    //         className: classes.menu,
                                    //     },
                                    // }}
                                    helperText='Seleccione una unidad'
                                    autoFocus
                                    required
                                >
                                    {unidades.length > 0 && [<MenuItem key='SinUnidad' value={'0'}>No es en una unidad</MenuItem>]
                                        .concat(unidades.map(unidad => (
                                            <MenuItem key={unidad.id} value={unidad.id}>
                                                {`Piso ${unidad.piso} - Dpto. ${unidad.numero}`}
                                            </MenuItem>
                                        )
                                    ))}
                                    {
                                        unidades.length <= 0 && []
                                    }
                                </TextField>
                            </Grid>
                            {
                                formValues.unidadSelected === '0' &&
                                <Grid style={{marginTop: '5px'}} item xs={12}>
                                    <TextField
                                        id='ubicacion'
                                        label='Ubicación del hecho'
                                        variant='outlined'
                                        fullWidth
                                        multiline
                                        rowsMax='4'
                                        value={formValues.ubicacion}
                                        onChange={this.handleChange('ubicacion')}
                                        autoFocus
                                        required
                                    />
                                </Grid>
                            }
                            <Grid item xs={12}>
                                <TextField
                                    id='comentario'
                                    label='Comentario'
                                    variant='outlined'
                                    fullWidth
                                    multiline
                                    rows={4}
                                    rowsMax='6'
                                    value={formValues.comentario}
                                    onChange={this.handleChange('comentario')}
                                    autoFocus
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <input onChange={this.onUploadImage} className='inputfile' id='file' type='file' name='file'/>
                                <label htmlFor='file'> Subir una imagen </label>
                                {formValues.imagenes && formValues.imagenes.length > 0 && <span style={{marginLeft: '5px', color: 'green'}}>Imagen cargada!</span>}
                            </Grid>
                        </Grid>
                    </form>
                    <Button
                        onClick={this.altaReclamo}
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        disabled={!canSubmit}
                        className={classes.submit}
                    >
                            Generar reclamo
                    </Button>
                    {altaReclamoSubmitted && <Chip
                        color='primary'
                        label={altaReclamoStatusMessage}
                        onClick={this.handleClick}
                        onDoubleClick={this.handleClick}
                        deleteIcon={<DoneIcon />}
                    />}
                </div>
            </Container>
        );
    }
}

export default withStyles(styles)(ReclamoForm);