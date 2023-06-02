import React from "react";
import yes from "../../../_assets/images/IPO/yes.svg"
import no from "../../../_assets/images/IPO/no.svg"

export function StrengthRisk(props) {

    const { data } = props;


    if (data && data.risks.length == 0 && data.strengths.length == 0) {
        return <></>
    }

    return (
        <section>
            <div className="strengthrisk_block">
                <div className="container">
                    <div className="info_block grid">
                        <div className="grid_block">
                            <div className="row">
                                
                                    {
                                        data && data.strengths.length > 0 &&
                                        <div className="col-md-6">
                                            <div className="info_block">
                                                <div className="info_heading">
                                                    <h2>Strength</h2>
                                                </div>
                                                {data?.strengths.map((item, index) => (
                                                   
                                                        <div className="risks_content positive"  key={index}>
                                                            <div className="row align-items-center">
                                                                <div className="col-md-9">                                                                
                                                                    {item.title == null ? "" : 
                                                                    
                                                                    <>
                                                                    <h3 className="m-b-1">{  item.title}</h3>
                                                                    </>
                                                                    
                                                                    }
                                                                    <p>{item.description}</p>
                                                                </div>
                                                                <div className="col-md-3 right_content">
                                                                <label className="btn_label positive"><img
                                                                    src={yes}
                                                                    alt="Strength"
                                                                /> Strength</label>
                                                            </div>
                                                            </div>
                                                        </div>


                                                   
                                                ))}
                                            </div>
                                        </div>
                                    }
                                
                                
                                    {
                                        data && data.risks.length > 0 &&
                                        <div className="col-md-6">
                                        <div className="info_block risk-content">
                                            <div className="info_heading">
                                                <h2>Risks</h2>
                                            </div>
                                            {data?.risks.map((item, index) => (
                                               
                                                    <div className="risks_content negative" key={index}>
                                                        <div className="row">
                                                            <div className="col-md-9">
                                                            {item.title == null ? "" : 
                                                                    
                                                                    <>
                                                                    <h3 className="m-b-1">{  item.title}</h3>
                                                                    </>
                                                                    
                                                                    }                                                            
                                                                <p>{item.description}</p>
                                                            </div>
                                                            <div className="col-md-3 right_content">
                                                            <label className="btn_label negative"><img
                                                                src={no}
                                                                alt="Risk"
                                                            /> Risk</label>
                                                        </div>
                                                        </div>
                                                    </div>


                                               
                                            ))}
                                        </div>
                                        </div>
                                    }
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}