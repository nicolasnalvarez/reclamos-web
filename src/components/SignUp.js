import React, {useState} from 'react';
import _ from 'lodash';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        margin: theme.spacing(4, 0, 4, 0),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp({registerUser}) {
    const classes = useStyles();
    const [dniHasError, setDniError] = useState(false);
    const [passwordHasError, setPasswordError] = useState(false);
    const [confirmPasswordHasError, setConfirmPasswordError] = useState(false);
    const [dni, setDni] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Buscar una mejor manera
    const canSubmit = !dniHasError && dni && firstName && lastName && email && password && confirmPassword;

    const handleChange = (valueSetter, errorHandler, errorSetter) => ({ target: {value} }) => {
        valueSetter(value);
        if (errorHandler)
            errorHandler(value, errorSetter);
    };

    const handleDniError = (value, errorSetter) => errorSetter(!value || !isValidNumber(value) || !_.inRange(value.length, 7, 9));
    const handlePasswordError = (value, errorSetter) => errorSetter(!value || !isValidPassword(value));
    const handleConfirmPasswordError = (value, errorSetter) => errorSetter(!value || value !== password);

    const isValidNumber = number => /^[\d]+$/.test(number);
    const isValidPassword = password => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);

    const register = () => {
        // event.preventDefault();
        const newUser = {
          nombre: firstName,
          apellido: lastName,
          dni: dni,
          usuario: email,
          password: password
        };

        // fetch('http://localhost:8080/register',
        //     {
        //         method: 'POST',
        //         body: JSON.stringify(newUser),
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     })
        //     .then(response => response.json())
        //     .then(cleanResponse => {
        //         if (cleanResponse.status === 201) {
        //             registerUser();
        //         }
        //     })
        //     .catch(error => console.error('Error:', error));

        registerUser(newUser);
    };

    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    Sign up
                </Typography>
                    <form className={classes.form} onSubmit={() => {return false;}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete='fname'
                                variant='outlined'
                                required
                                fullWidth
                                value={firstName}
                                id='firstName'
                                label='Nombre'
                                name='firstName'
                                autoFocus
                                onChange={handleChange(setFirstName)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant='outlined'
                                required
                                fullWidth
                                value={lastName}
                                id='lastName'
                                label='Apellido'
                                name='lastName'
                                autoComplete='lname'
                                onChange={handleChange(setLastName)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant='outlined'
                                required
                                helperText='Por favor, ingrese su DNI sin puntos, sólo números'
                                fullWidth
                                value={dni}
                                id='dni'
                                label='DNI'
                                name='dni'
                                error={dniHasError}
                                onChange={handleChange(setDni, handleDniError, setDniError)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant='outlined'
                                required
                                fullWidth
                                value={email}
                                id='email'
                                label='Dirección de email'
                                name='email'
                                autoComplete='email'
                                onChange={handleChange(setEmail)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant='outlined'
                                required
                                helperText='Debe tener un mínimo de 8 caracteres y al menos un número'
                                fullWidth
                                value={password}
                                name='password'
                                label='Contraseña'
                                type='password'
                                id='password'
                                error={passwordHasError}
                                autoComplete='current-password'
                                onChange={handleChange(setPassword, handlePasswordError, setPasswordError)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant='outlined'
                                required
                                helperText={confirmPasswordHasError? 'Debe coincidir con la contraseña' : ''}
                                fullWidth
                                value={confirmPassword}
                                name='confirmPassword'
                                label='Confirmar contraseña'
                                type='password'
                                id='confirmPassword'
                                error={confirmPasswordHasError}
                                onChange={handleChange(setConfirmPassword, handleConfirmPasswordError, setConfirmPasswordError)}
                            />
                        </Grid>
                        {/*<Grid item xs={12}>*/}
                        {/*    <FormControlLabel*/}
                        {/*        control={<Checkbox value='acceptTermsAndConditions' color='primary' />}*/}
                        {/*        label='Acepto los términos y condiciones'*/}
                        {/*    />*/}
                        {/*</Grid>*/}
                    </Grid>
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={classes.submit}
                        disabled={!canSubmit}
                        onClick={register}
                    >
                        Registrarse
                    </Button>
                    <Grid container justify='flex-end'>
                        <Grid item>
                            <Link to='/login' variant='body2'>
                                ¿Ya tenés una cuenta? Logueate aquí
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}