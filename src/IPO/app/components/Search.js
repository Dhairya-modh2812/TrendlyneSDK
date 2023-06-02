import React from "react";
import search from "../../../_assets/images/IPO/Search.svg"
import * as ipo_actions from "../../../_redux/ipo/actions"
import { slugify } from "../../../_helpers/Functional";

export function Search(props) {

    const {onInputChange} = props

    return (
        <>
            <div className="search">
                <div className="from_group">
                    <input onChange={(event)=>onInputChange(event.target.value)} type="text" placeholder="Search by name or code" />     
                    <img
                            src={search}
                            alt="search"
                            />                  
                </div>
            </div>
        </>
    );
}