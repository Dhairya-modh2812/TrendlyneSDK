import React from "react";
import {Routes} from "./Routes";
import {BrowserRouter} from "react-router-dom";

function App(props) {
    const { poweredby, baseUrl = '/', defaultRedirect = '' } = props
    return (
        <>
            <BrowserRouter basename={baseUrl}>
                <Routes
                    poweredby = {poweredby}
                    defaultRedirect={defaultRedirect}
                />
            </BrowserRouter>
        </>
    );
}

export default App;
