import React from "react";
import {Routes} from "./Routes";
import {BrowserRouter} from "react-router-dom";

function App(props) {
    const {poweredby} = props
    return (
        <>
            <BrowserRouter basename="/">
            <Routes
                poweredby = {poweredby}
                />
            </BrowserRouter>
        </>
    );
}

export default App;
