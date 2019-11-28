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
import Chip from '@material-ui/core/Chip';
import * as rp from 'request-promise';
import Firebase from '../utils/Firebase.js';
import firebase from 'firebase';
import { uploadImage, downloadImage } from '../utils/UploadImage';
import './ReclamoForm.scss';
import CircularProgress from '@material-ui/core/CircularProgress';

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
        altaReclamoSubmitted: false,
        waiting: false
    };

    hideReclamoSubmitted = () => this.setState({altaReclamoSubmitted: false});

    componentDidMount() {
        new Firebase();
        const currentUser = this.props.currentUser;

        const tipoUsuario = currentUser.tipoUsuario;
        const dni = currentUser.dni;
        this.setState({ waiting: true });

        fetch(`http://localhost:8080/edificios/personas/${tipoUsuario}/${dni}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(cleanResponse => {
                if (cleanResponse.status === 500) throw new Error(cleanResponse.message);
                console.log("edificios: " + JSON.stringify(cleanResponse));
                this.setState({ edificios: cleanResponse, waiting: false });
            })
            .catch(error => {
                console.error('Error:', error)
                this.setState({ waiting: false });
            });
    }

    onChangeEdificio = edificioSelected => {
        const currentUser = this.props.currentUser;

        let tipoUsuario = 1;
        let dni = 'DNI30012288';
        if (currentUser) {
            tipoUsuario = currentUser.tipoUsuario;
            dni = currentUser.dni;
        }

        this.setState({ waiting: true });
        setTimeout(() => rp({
            method: 'GET',
            uri: `http://localhost:8080/unidades/personas/${tipoUsuario}/${dni}/edificios/${edificioSelected}`,
            headers: {'content-type': 'application/json'},
            json: true
        })
            .then(response => {
                this.setState({ unidades: response, waiting: false });
                // setRegisterError(false);
            })
            .catch( err => {
                console.log('mal con: ' + err);
            }), 1500);
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

    onUploadImage = async ({target}) => {
        let imagenesU = [];

        firebase.app();
        const storageRef = firebase.storage().ref('images');
        this.setState({ waiting: true });

        for (let file of target.files) {
            const imageName = file.name + ' - ' + Date.now();
            const imageRef = storageRef.child(imageName);

            await imageRef.put(file);
            const imagePath = await downloadImage(storageRef, imageName);

            imagenesU.push({
                path: imagePath,
                tipo: file.type
            });
        }

        if (target.files) {
            this.setState({
                formValues: {
                    ...this.state.formValues,
                    imagenes: [...this.state.formValues.imagenes, ...imagenesU]
                },
                waiting: false
            });
        }
            // uploadTask.on(
            //     'state_changed',
            //     snapshot => {
            //         const progress = Math.round(
            //             (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            //         );
            //
            //         // this.setState({ progress });
            //     },
            //     error => {
            //         // Error function ...
            //         console.log('Error subiendo imagen: ' + error);
            //     },
            //     () => {
            //         // complete function ...
            //         firebase.storage
            //             .ref('images')
            //             .child(file.name)
            //             .getDownloadURL()
            //             .then(url => {
            //                 this.setState({ url });
            //             });
            //     }
            // );
        // });
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
        const dni = currentUser.dni;

        const newReclamo = {
            idEdificio: formValues.edificioSelected,
            idUnidad: formValues.unidadSelected,
            ubicacion: formValues.ubicacion,
            descripcion: formValues.comentario,
            documento: dni
        };

        this.setState({altaReclamoStatusMessage: 'Reclamo generado exitosamente'});

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
                if (cleanResponse.error || cleanResponse.status === 500)
                    throw new Error(cleanResponse.message);

                this.setState({altaReclamoSubmitted: true});
                setTimeout(() => this.setState({altaReclamoSubmitted: false}), 5000);
            })
            .catch(error => console.error('Error:', error.message));
    };

    render() {
        const {classes} = this.props;
        const {formValues, hasError, edificios, unidades, altaReclamoSubmitted, altaReclamoStatusMessage, waiting} = this.state;

        // Buscar una mejor manera
        const canSubmit = formValues.edificioSelected && formValues.unidadSelected && formValues.comentario && !waiting;

        return (
            <Container component='main' maxWidth='xs' className='altaReclamoContainer'>
                <CssBaseline/>
                <div className={classes.paper}>
                    <Typography component='h1' variant='h5'>
                        Aquí puede generar un nuevo reclamo
                    </Typography>
                    <form className={classes.form} onSubmit={() => {return false;}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id='edificios'
                                    select
                                    label='Edificios'
                                    variant='outlined'
                                    fullWidth
                                    value={formValues.edificioSelected}
                                    onChange={this.handleChange('edificioSelected', this.onChangeEdificio)}
                                    helperText='Seleccione un edificio'
                                    autoFocus
                                    required
                                >
                                    {
                                        (!edificios && []) || edificios.map(edificio => <MenuItem key={edificio.id} value={edificio.id}>{edificio.nombre}</MenuItem>)
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
                                <input onChange={this.onUploadImage} className='inputfile' id='file' type='file' name='file' multiple={true}/>
                                <label htmlFor='file'> Subir una imagen </label>
                                {formValues.imagenes && formValues.imagenes.length > 0 && <span style={{marginLeft: '5px', color: 'green'}}>Imágenes cargadas!</span>}
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
                    {waiting && <CircularProgress className='spinner bottom' size={50} thickness={2}/>}
                    {(altaReclamoSubmitted) && <Chip
                        className='successfullyCreated'
                        style={{backgroundColor: 'green', color: 'white'}}
                        label={altaReclamoStatusMessage}
                        onClick={this.hideReclamoSubmitted}
                        onDoubleClick={this.hideReclamoSubmitted}
                    />}
                </div>
            </Container>
        );
    }
}

export default withStyles(styles)(ReclamoForm);