import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import company from "../../../_assets/images/IPO/compay.png"
import { Link } from 'react-router-dom';
import { Search } from "./Search";
import * as ipo_actions from "../../../_redux/ipo/actions"
import { slugify } from "../../../_helpers/Functional";

export function IpoSearch(props) {

    const dispatch = useDispatch();
    const [open, setOpen] = useState(false)
    const [ipoDashboardSearch, setipoDashboardSearch] = useState(null);
    const [search, setSearch] = useState('')
    
    function compare( a, b ) {
        if ( a.company_name < b.company_name ){
          return -1;
        }
        if ( a.company_name > b.company_name ){
          return 1;
        }
        return 0;
    }
    useEffect(() => {

        if (search != "" && search.length > 1) {
            dispatch(ipo_actions.getDashboardsearch(search)).then((response) => {                     
                let sortData =[ ...response]
                sortData = sortData.sort(compare);       
                setipoDashboardSearch(sortData); 
                if (response.length == 0){
                    setipoDashboardSearch([{company_name:'No matches found',ipo_id:'0', ipo_slug_name:'no_data_found'}] );
                }
             
            })
        }   
    }, [search]);


    const handleSearch = (value) => {        
        setSearch(value); 
        if (value.length > 1 && !open) {
            setOpen(true)
        }
        if (value.length == 0) {
            setOpen(false)
        }       
    }     

    return (
        <>
            <div className="search_block">
                <Search
                    onInputChange={handleSearch}                   
                ></Search>
                <ul className={`search_list ${open ? 'd-block' : 'd-none'}`}>
                    {ipoDashboardSearch?.map((item, index)  => {
                        return (
                            <>
                                <li><Link to={`/detail/${item.ipo_id}/${slugify(item.ipo_slug_name)}/`}>{item.company_name}</Link></li>
                            </>
                            
                        )
                    })}
                </ul>
            </div>
        </>
    );
}
