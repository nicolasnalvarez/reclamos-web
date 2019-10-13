import React from 'react';
import './App.css';
import ReclamoForm from './components/ReclamoForm';
import Header from "./components/Header";
import Footer from "./components/Footer"
import Reclamos from "./components/Reclamos";
import ReclamoBusqueda from "./components/ReclamoBusqueda";
import Login from "./components/Login";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

const RECLAMOS = [
    {
        id: '5238868',
        documento: '30192158',
        edificio: 'Torre Alem',
        unidad: 'Dpto. 2C',
        ubicacion: "Lenadro N. Alem 1991, CABA",
        descripcion: 'Descripción del reclamo 1',
        estado: 'desestimado'
    },
    {
        id: '9235092',
        documento: '35221036',
        edificio: 'Las margaritas',
        unidad: 'Dpto. 5A',
        ubicacion: "Holmberg 292, CABA",
        descripcion: 'Descripción del reclamo 2 más o menos larga, ni muy corta ni super larga, algo intermedio digamos',
        estado: 'nuevo'
    },
    {
        id: '01401958',
        documento: '40019302',
        edificio: 'Los Sauces',
        unidad: 'Dpto. 12D',
        ubicacion: "Griveo 2030, CABA",
        descripcion: 'Descripción del reclamo 3 recontra super mega archi larga con un montón de cosas adentro para ver como se ve acá, porque si se ve feo o rompe cagamos fuego',
        estado: 'enProceso'
    }
];
//nuevo, abierto, enProceso, desestimado, anulado, terminado

function App() {
    return (
        <>
            <Header/>
            {/*<ReclamoForm/>*/}
            {/*<Reclamos titulo='RECLAMOS' reclamos={RECLAMOS}/>*/}
            {/*<ReclamoBusqueda/>*/}
            <Login/>
            <Footer/>
        </>
    );
}

export default App;
