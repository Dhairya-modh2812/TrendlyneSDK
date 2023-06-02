import React from "react";
import {Routes} from "./Routes";
import {BrowserRouter} from "react-router-dom";
import XYComparisonState from "./context/XYComparisonState";

function App(props) {
    const { showPoweredBy, baseUrl = '/', defaultRedirect = '' } = props;
    return (
        <>
            <XYComparisonState {...props}>
                <BrowserRouter basename={baseUrl}>
                    <Routes
                        poweredby = {showPoweredBy}
                        defaultRedirect={defaultRedirect}
                    />
                </BrowserRouter>
            </XYComparisonState>
        </>
    );
}

export default App;
