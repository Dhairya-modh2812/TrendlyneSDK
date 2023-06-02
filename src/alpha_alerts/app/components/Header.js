import React from "react";
import {Navbar} from "react-bootstrap";

export function Header({selectedHeaderAction, setSelectedHeaderAction}) {
    return (
        <>
            <div className="container p-0">
                <Navbar className="d-flex justify-content-center navbar">
                    <Navbar.Brand>
                        <div className="rounded_buttons">
                            <div className={`btn ${selectedHeaderAction === 'manage' ? 'active' : ''}`}
                                 onClick={() => setSelectedHeaderAction('manage')}>
                                Manage
                            </div>  
                            <div className={`btn ${selectedHeaderAction === 'triggered' ? 'active' : ''}`}
                                 onClick={() => setSelectedHeaderAction('triggered')}>
                                Triggered
                            </div>
                        </div>
                    </Navbar.Brand>
                </Navbar>
            </div>
        </>
    );
}
