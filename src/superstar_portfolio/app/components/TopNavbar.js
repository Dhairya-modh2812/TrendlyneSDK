import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import superstarContext from '../context/superstar/superstarContext'
function TopNavbar() {
    const { topNavbarToggle, topNavbarInsiderToggle, topNavbarBulkBlockDealsToggle } = useContext(superstarContext);

    const urlHash = window?.location?.hash;
    let toUrlbase = '/';
    let toUrlInsider = '/group-insider-trading-sast/';
    let toUrlBulkBlockDeals = '/bulk-block-deals/';
    if (urlHash) {
        toUrlbase += urlHash;
        toUrlInsider += urlHash;
        toUrlBulkBlockDeals += urlHash;
    }
    return (<>
        {topNavbarToggle == "true" ? <div className='container'>
            <div className="d-flex flex-row navbar-nav top-navbar">
                <NavLink exact className="nav-item nav-link" activeClassName='active' to={toUrlbase}>Superstars</NavLink>
                {topNavbarInsiderToggle == "true" && <NavLink exact className="nav-item nav-link" activeClassName='active' to={toUrlInsider}>Insider Trading</NavLink>}
                {topNavbarBulkBlockDealsToggle == "true" && <NavLink exact className="nav-item nav-link" activeClassName='active' to={toUrlBulkBlockDeals}>Bulk Block Deals</NavLink>}
            </div>
        </div> : <></>}
    </>)
}

export default TopNavbar