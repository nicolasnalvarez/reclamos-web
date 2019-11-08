import React, {useEffect, useState} from 'react';
import ReclamoForm from './components/ReclamoForm';
import Header from './components/Header';
import Footer from './components/Footer'
import Reclamos from './components/Reclamos';
import ReclamoBusqueda from './components/ReclamoBusqueda';
import Login from './components/Login';
import {Router, Route, Switch} from 'react-router-dom';
import SignUp from './components/SignUp';
import Home from "./components/Home";
import './App.scss';
import {getSessionCookie, setSessionCookie} from "./utils/CookiesUtils";
import {SessionContext} from "./utils/Constants";
import * as Cookies from 'js-cookie';
import * as rp from "request-promise";

//ESTADOS
//nuevo, abierto, enProceso, desestimado, anulado, terminado

const fakeUser = {
    firstName: 'dario',
    lastName: 'test',
    dni: '35221329',
    email: 'dar@ovo.com',
    password: 'pass',
    tipoUsuario: 1,
    usuario: 'dlipartiti'
};

function App({history}) {
    const [session, setSession] = useState(getSessionCookie());
    const [isLoggedIn, setLoggedIn] = useState(!!session.nombre);
    const [loginError, setLoginError] = useState(false);
    const [registerError, setRegisterError] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    // useEffect(
    //     () => {
    //         setSession(getSessionCookie());
    //     },
    //     [session]
    // );

    // Funciona como el componentDidMount()
    useEffect(() => {
        if (session.nombre && !currentUser)
            setCurrentUser(session);
    // }, [session.nombre]);
    }, []);

    const onUserRegister = newUser => {
        rp({
            method: 'POST',
            uri: 'http://localhost:8080/auth/register',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(newUser)
        })
        .then(function (response) {
            console.log('bien con: ' + response);
            setRegisterError(false);
            history.push('/login');
        })
        .catch(function (err) {
            console.log('mal con: ' + err);
            setRegisterError(true);
        });
    };

    const onUserLogin = (loginData, rememberMe) => {
        fetch('http://localhost:8080/auth/login',
            {
                method: 'POST',
                body: JSON.stringify(loginData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (response.status === 500) {
                    throw new Error('Usuario inválido!');
                }

                setLoggedIn(true);
                return response.json();
            })
            .then(cleanResponse => {
                setCurrentUser(cleanResponse);
                setLoginError(false);
                console.log(cleanResponse);
                localStorage.setItem('nombre', rememberMe? loginData.nombre : '');
                localStorage.setItem('password', rememberMe? loginData.password : '');

                setSessionCookie(cleanResponse);
                history.push('/home');
            })
            .catch(error => {
                console.error('Error:', error);
                setLoginError(true);
            });
    };

    const onUserLogOut = () => {
      setLoggedIn(false);
      setCurrentUser({});
      Cookies.remove("session");
        history.push('/login');
    };

    // TODO: agregar currentUser al Context y así evitar pasarlo como prop varias veces
    // TODO: agregar Loading components
    // TODO: sumar más validaciones en formularios
    // TODO: menú con submenú por búsqueda de reclamos con diferentes criterios
    // TODO: agregar perfil del usuario y pantalla de administrador
    // TODO: hashear password para la cookie o generar un JWT o no guardar la password directamente
    // TODO: cambiar menú por un ícono de hamburguesa

    return (
        <SessionContext.Provider value={session}>
            <Router history={history}>
                <>
                    <Header onUserLogOut={onUserLogOut} isLoggedIn={isLoggedIn} title='Gestión de reclamos'/>
                    <Switch>
                        {
                            currentUser &&
                            <Route
                                path='/reclamo'
                                render={props => <ReclamoForm currentUser={currentUser} />}
                            />

                        }
                        <Route path='/reclamos'>
                            <Reclamos currentUser={currentUser} titulo='RECLAMOS'/>
                        </Route>
                        <Route path='/busquedareclamos'>
                            <ReclamoBusqueda/>
                        </Route>
                        <Route path='/registro'>
                            <SignUp registerError={registerError} registerUser={onUserRegister}/>
                        </Route>
                        <Route path='/login'>
                            <Login loginError={loginError} setSessionCookie={setSessionCookie} onUserLogin={onUserLogin}/>
                        </Route>
                        <Route path='/home'>
                            <Home isLog={isLoggedIn}/>
                        </Route>
                        <Route path='*'>
                            <Home/>
                        </Route>
                    </Switch>
                    <Footer/>
                </>
            </Router>
        </SessionContext.Provider>
    );
}

export default App;