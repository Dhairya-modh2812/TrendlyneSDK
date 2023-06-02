import React, { useEffect, useState } from "react";
import NewIcon from "../../../_assets/images/IPO/new_icon.png"

export function NewsFooter(props) {
    const {postpagelink} = props

    if(postpagelink == null || postpagelink == undefined || postpagelink == ""){
        return <></>
    }
        
    return (
               
            <>
                 <a href={postpagelink} className="section_news_footer d-block" alt="View all popular news on Trendlyne">
                    <p className="m-0">View All Popular on Trendlyne
                        <img
                            src={NewIcon}
                            alt="NewIcon"
                        /></p>
                </a>              
            </>           
       
    );
}
