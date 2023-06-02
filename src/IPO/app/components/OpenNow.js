import React from "react";
import company from "../../../_assets/images/IPO/compay.png"
import { Search } from "./Search";
import Open from "../../../_assets/images/IPO/open.svg"
import { Link } from 'react-router-dom';
import Atom from "../../../_assets/images/IPO/atom-light-icon.svg"
import Company1 from "../../../_assets/images/IPO/Company1.png"
import Company2 from "../../../_assets/images/IPO/Company2.png"
import { IPODetail } from "../IPODetail";
import { slugify } from "../../../_helpers/Functional";
import Up from "../../../_assets/images/IPO/up.svg"

export function OpenNow(props) {

    const { data } = props
    

    const priceRange = (min, max) => {
        if (min == null && max == null)
            return <>-</>;
        else if (min == max) {
            return <>{'₹' + min}</>;
        }
        else {
            return <>{'₹' + min} - {'₹' + max}</>
        }
    }

    const IpoDoc = (rhp, drhp) => {
        if ((rhp == null || rhp == '') && (drhp == null || drhp == '')) {
            return <></>;
        }
        else if (rhp !== null && rhp != "") {
            return <>  <a target="_blank" className="icon_list flex "  href={rhp}>
                <img
                    src={Atom}
                    alt="Atom"
                />
            </a> </>;
        }
        else {
            return <>{<a  target="_blank" className="icon_list flex " href={drhp}>
                <img
                    src={Atom}
                    alt="Atom"
                />
            </a>}</>
        }
    }


    return (
        <>
            <div className="section_open">
                <div className="section_header">
                    <h2 className="no-transform">UPCOMING/OPEN IPOs <img
                        src={Open}
                        alt="Open"
                    /> </h2>
                    <p className="fw-normal">Invest in the IPOs that are open now and gain from it.</p>
                </div>
                <div className="IPOList">
                    {
                        data && data.length == 0 ? <><div className="listing-er">No open IPOs. Please wait for upcoming IPOs to open</div></> :
                            <div className="row">
                                {data?.map((item, index) => {
                                    return (

                                        <div className="col-md-6" key={index}>
                                            <div className="list_block">
                                                <div className="row list_header">
                                                    <div className="col-md-12">
                                                        <h3>
                                                            <Link to={`/detail/${item.ipo_id}/${slugify(item.company_slug_name)}/`}> {item.company_name}</Link>
                                                        </h3>

                                                        <p className="bid_detail">Bidding from <span>{item.bid_start_date}</span> - <span>{item.bid_end_date}</span></p>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="right_content">
                                                            <label className="strong"><span className="list_count">{item.strength_count}</span> Strengths</label>
                                                            <label className="week"><span className="list_count">{item.risk_count}</span> Weakness</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row align-items-end share">
                                                <div className="col-md-7">
                                                     
                                                     <div className="block-content">
                                                     <div className="block_subscribe">
                                                                    {item.is_open_now ? <>
                                                                     <h6>
                                                                         {item.subscription_value == null ? "" : item.subscription_value + ' x'}
                                                                     </h6>
     
                                                                     <sub className="font_small mx-1">   {item.subscription_text == null ? "" : item.subscription_text}</sub>
                                                                     </> : "Opening Soon"}
                                                                 </div> 
                                                     </div>
                                                         </div> 
                                                    <div className="col-md-5">
                                                    <div className="block-content">
                                                    <h6 className="right_content list_price">
                                                        {priceRange(item.price_range_min, item.price_range_max)}
                                                        <p className="font_small">per share</p>
                                                    </h6>
                                                </div>
                                                    </div> 
                                                   
                                                </div>
                                             
                                                <div className="list_footer">
                                                    <div className="row align-items-center">
                                                        <div className="col-11 px-0">
                                                            {item.is_open_now && <div className="row">
                                                                { item?.subscription_data_keys && item?.subscription_data_keys.length ? (
                                                                    item?.subscription_data_keys?.map( (sub_header, index) => <>
                                                                        <div className="col">
                                                                            <h6>{ sub_header.name }</h6>
                                                                            <p>{item[sub_header.accessor] || "-"}</p>
                                                                        </div>
                                                                    </>
                                                                )): null}
                                                                <div className="col">
                                                                    <h6>Lot Size</h6>
                                                                    <p>{ item.lot_size || "-"}</p>
                                                                </div>
                                                            </div>}
                                                        </div>
                                                        <div className="col-1 right_content px-0">

                                                            <h6>{IpoDoc(item.ipo_rhp_document, item.ipo_drhp_document)}</h6>



                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    )
                                })}

                            </div>
                    }

                </div>
            </div>
        </>
    );
}
