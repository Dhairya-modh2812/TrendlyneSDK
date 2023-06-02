import React from "react";
import {Routes} from "./Routes";
import {BrowserRouter} from "react-router-dom";
import SuperstarState from './context/superstar/superstarState';


function App(props) {
    
    const { baseUrl, poweredby } = props;
    return (
        <>
        
        <SuperstarState {...props}>
            <BrowserRouter  basename={baseUrl}>                     
                <Routes
                poweredby = {poweredby}
                />
            </BrowserRouter>
        </SuperstarState>
        </>
    );
}

export default App;
