import React, {useState} from 'react';

import './App.css';
import ReclamoForm from './components/ReclamoForm';
import Header from './components/Header';
import Footer from './components/Footer'
import Reclamos from './components/Reclamos';
import ReclamoBusqueda from './components/ReclamoBusqueda';
import Login from './components/Login';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import SignUp from './components/SignUp';

const RECLAMOS = [
    {
        id: '5238868',
        documento: '30192158',
        edificio: 'Torre Alem',
        unidad: 'Dpto. 2C',
        ubicacion: 'Lenadro N. Alem 1991, CABA',
        descripcion: 'Descripción del reclamo 1',
        estado: 'desestimado'
    },
    {
        id: '9235092',
        documento: '35221036',
        edificio: 'Las margaritas',
        unidad: 'Dpto. 5A',
        ubicacion: 'Holmberg 292, CABA',
        descripcion: 'Descripción del reclamo 2 más o menos larga, ni muy corta ni super larga, algo intermedio digamos',
        estado: 'nuevo'
    },
    {
        id: '01401958',
        documento: '40019302',
        edificio: 'Los Sauces',
        unidad: 'Dpto. 12D',
        ubicacion: 'Griveo 2030, CABA',
        descripcion: 'Descripción del reclamo 3 recontra super mega archi larga con un montón de cosas adentro para ver como se ve acá, porque si se ve feo o rompe cagamos fuego',
        estado: 'enProceso'
    }
];
//nuevo, abierto, enProceso, desestimado, anulado, terminado

function App() {
    const [isLoggedIn, logIn] = useState(false);

    return (
        <BrowserRouter>
            <>
                <Header isLoggedIn={isLoggedIn} title='Sistema de gestión de reclamos'/>
                <Switch>
                    <Route path='/reclamo'>
                        <ReclamoForm/>
                    </Route>
                    <Route path='/reclamos'>
                        <Reclamos titulo='RECLAMOS' reclamos={RECLAMOS}/>
                    </Route>
                    <Route path='/busquedareclamos'>
                        <ReclamoBusqueda/>
                    </Route>
                    <Route path='/registro'>
                        <SignUp/>
                    </Route>
                    <Route path='/login'>
                        <Login/>
                    </Route>
                    <Route path='/'>
                        <Home />
                    </Route>
                </Switch>
                <Footer/>
            </>
        </BrowserRouter>
    );
}

export default App;

function Home() {
    return <h2>Home</h2>;
}

function About() {
    return <h2>About</h2>;
}

function Users() {
    return <h2>Users</h2>;
}