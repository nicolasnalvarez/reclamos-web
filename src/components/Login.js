import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Link, withRouter} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {setSessionCookie} from "../utils/CookiesUtils";

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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default withRouter(function Login({onUserLogin, history, setSessionCookie}) {
    const classes = useStyles();
    const [nombre, setNombre] = useState('');
    const [password, setPassword] = useState('');
    const [saveCookies, setSaveCookies] = useState(false);

    const handleChange = valueSetter => ({ target: {value} }) => valueSetter(value);

    const login = event => {
        event.preventDefault();
        history.push('/home');
        if (saveCookies)
            setSessionCookie({email});
        onUserLogin({nombre, password});
    };

    const saveSessionCookies = rememberMe => {
        setSaveCookies(rememberMe);
    };

    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component='h1' variant='h5'>
                    Log in
                </Typography>
                <form className={classes.form} noValidate onSubmit={event => {
                    return false;
                }}>
                    <TextField
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        id='nombre'
                        label='Usuario'
                        name='nombre'
                        autoComplete='nombre'
                        onChange={handleChange(setNombre)}
                        autoFocus
                    />
                    <TextField
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        name='password'
                        label='Contraseña'
                        type='password'
                        id='password'
                        onChange={handleChange(setPassword)}
                        autoComplete='current-password'
                    />
                    <FormControlLabel
                        control={<Checkbox value={saveCookies} onChange={saveSessionCookies} color='primary' />}
                        label='Recordarme'
                    />
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={classes.submit}
                        onClick={login}
                    >
                        Loguearse
                    </Button>
                    <Grid justify='center' container>
                        <Grid item>
                            <Link to='/registro' variant='body2'>
                                ¿No tenés una cuenta? Registrate
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
})