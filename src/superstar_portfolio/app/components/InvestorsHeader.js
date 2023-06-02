import React from "react";
import {Navbar, Row} from "react-bootstrap";

export function InvestorsHeader() {

    const brokerName = window?.TLConfig?.BROKER_NAME || "";

    const title = brokerName === "ICHBIAH" ? "Superstar Portfolio" : "Top Investors Portfolio";

    return (
        <>
            <div className="investors_header">
                <div className="container">  
                   <div className="row align-items-center">
                       <div className="col-md-12">
                            <h3>{title}</h3>                            
                            <div className="block_content">
                                <p>Meet the investment world's Big Sharks and uncover where and how they invest. To stay on top of the competition, discover where their money is invested and what they are buying or selling as these Investment Gurus filter diamonds from dust and identify potential multi-baggers.</p>
                            </div>
                       </div>                     
                    </div>                          
                </div>
            </div>         
        </>
    );
}
