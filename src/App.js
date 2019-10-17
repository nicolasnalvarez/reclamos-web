import React, {useEffect, useState} from 'react';
import ReclamoForm from './components/ReclamoForm';
import Header from './components/Header';
import Footer from './components/Footer'
import Reclamos from './components/Reclamos';
import ReclamoBusqueda from './components/ReclamoBusqueda';
import Login from './components/Login';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import SignUp from './components/SignUp';
import Home from "./components/Home";
import './App.scss';
import {getSessionCookie, setSessionCookie} from "./utils/CookiesUtils";
import {SessionContext} from "./utils/Constants";
import * as Cookies from 'js-cookie';

const RECLAMOS = [
    {
        id: '5238868',
        documento: '30192158',
        idEdificio: '5',
        edificio: 'Torre Alem',
        idUnidad: '102',
        unidad: 'Dpto. 2C',
        ubicacion: 'Lenadro N. Alem 1991, CABA',
        descripcion: 'Descripción del reclamo 1',
        estado: 'desestimado'
    },
    {
        id: '9235092',
        documento: '35221036',
        idEdificio: '6',
        edificio: 'Las margaritas',
        idUnidad: '101',
        unidad: 'Dpto. 5A',
        ubicacion: 'Holmberg 292, CABA',
        descripcion: 'Descripción del reclamo 2 más o menos larga, ni muy corta ni super larga, algo intermedio digamos',
        estado: 'nuevo'
    },
    {
        id: '01401958',
        documento: '40019302',
        idEdificio: '7',
        edificio: 'Los Sauces',
        idUnidad: '100',
        unidad: 'Dpto. 12D',
        ubicacion: 'Griveo 2030, CABA',
        descripcion: 'Descripción del reclamo 3 recontra super mega archi larga con un montón de cosas adentro para ver como se ve acá, porque si se ve feo o rompe cagamos fuego',
        estado: 'enProceso'
    }
];
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
    const [isLoggedIn, setLoggedIn] = useState(!!session.email);

    const [currentUser, setCurrentUser] = useState(null);
    // useEffect(
    //     () => {
    //         setSession(getSessionCookie());
    //     },
    //     [session]
    // );

    // Funciona como el componentDidMount()
    useEffect(() => {
        if (session.usuario)
            setCurrentUser(fakeUser);
    });

    const registerUser = () => {
        history.push('/login');
    };

    const onUserLogin = (loginData, rememberMe) => {
        if (rememberMe)
            setSessionCookie({usuario: fakeUser.usuario, email: fakeUser.email, dni: fakeUser.dni, tipoUsuario: 1});

        setLoggedIn(true);
        setCurrentUser(fakeUser);

        // CON SERVER DESCOMENTAR LO SIGUIENTE:
        // fetch('http://localhost:8080/auth/login',
        //     {
        //         method: 'POST',
        //         body: JSON.stringify(loginData),
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     })
        //     .then(response => response.json())
        //     .then(cleanResponse => {
        //         if (cleanResponse.status === 200) {
        //             setLoggedIn(true);
        //             setCurrentUser(cleanResponse.body);
        //             if (rememberMe)
        //                 setSessionCookie(cleanResponse.body);
        //         }
        //     })
        //     .catch(error => console.error('Error:', error));
    };

    const onUserLogOut = () => {
      setLoggedIn(false);
      setCurrentUser({});
      Cookies.remove("session");
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
            <BrowserRouter history={history}>
                <>
                    <Header onUserLogOut={onUserLogOut} isLoggedIn={isLoggedIn} title='Gestión de reclamos'/>
                    <Switch>
                        <Route path='/reclamo'>
                            <ReclamoForm currentUser={currentUser}/>
                        </Route>
                        <Route path='/reclamos'>
                            <Reclamos currentUser={currentUser} titulo='RECLAMOS' reclamos={RECLAMOS}/>
                        </Route>
                        <Route path='/busquedareclamos'>
                            <ReclamoBusqueda/>
                        </Route>
                        <Route path='/registro'>
                            <SignUp registerUser={registerUser}/>
                        </Route>
                        <Route path='/login'>
                            <Login setSessionCookie={setSessionCookie} onUserLogin={onUserLogin}/>
                        </Route>
                        <Route path='/home'>
                            <Home/>
                        </Route>
                        <Route path='*'>
                            <Home/>
                        </Route>
                    </Switch>
                    <Footer/>
                </>
            </BrowserRouter>
        </SessionContext.Provider>
    );
}

export default App;