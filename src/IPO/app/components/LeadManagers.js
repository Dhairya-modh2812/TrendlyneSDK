import React from "react";
import yes from "../../../_assets/images/IPO/yes.svg"
import no from "../../../_assets/images/IPO/no.svg"
import { groupBy } from "../../../_helpers/CommonFunctions";

export function LeadManagers(props) {

    const { data } = props;

    if (data == undefined) {
        return <></>
    }
    if (data && data.length == 0){
        return <></>
    }
    const groupData = groupBy(data, 'designation')   

    const gethtml = () => {
            let list = [];
            Object.keys(groupData).forEach((key, index) => {            
            let html = (<div className="block" key={index}>
                <div className="info_heading">
                    <h2>{key}</h2>
                </div>
                <div className="block_content">
                    <div className="lead_row">
                        

                        {groupData[key]?.map((item, i) => {                           
                            return (
                               
                                    <div key={i} className="lead_block">
                                        <h3 className="m-b-1">{item.name}</h3>
                                        <p>{item.email}</p>                                        
                                    </div>
                              
                            )
                        })}


                    </div>
                </div>
            </div>)
            list.push(html);
        })         

        return list
    }

    return (
        <section>
            <div className="lead_managers_block">
                <div className="container">
                    <div className="info_block">
                    {gethtml()}
                    </div>
                    
                </div>
            </div>
        </section>
    );
}