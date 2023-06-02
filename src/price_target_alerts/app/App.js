import React from "react";
import {Routes} from "./Routes";
import {BrowserRouter} from "react-router-dom";

function App(props) {
    return (
        <>
            <BrowserRouter basename="/">
                <Routes {...props}/>
            </BrowserRouter>
        </>
    );
}

export default App;
