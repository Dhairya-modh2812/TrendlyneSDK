import React from "react";
import yes from "../../../_assets/images/IPO/yes.svg"
import no from "../../../_assets/images/IPO/no.svg"

export function CompanyInfo(props) {

    const { data } = props


    if (data && data.promoters && data.promoters.length == 0 && data.about_the_company == '' && data.object_of_the_issue == '') {
        return <></>
    }

    return (
        <section>
            <div className="companyinfo">
                <div className="container">
                    <div className="info_block">
                        <div className="info_heading">
                            <h2>Information</h2>
                        </div>
                        
                            {
                                    
                                data && data.about_the_company == null || data && data.about_the_company == '' ? '' :
                                    <>
                                    <div className="block_content">
                                        <h3>About the Company</h3>
                                        <p dangerouslySetInnerHTML={{ __html: data?.about_the_company }}></p>
                                        </div>
                                    </>
                                    
                            }
                        
                        
                            {
                                data && data.object_of_the_issue == null || data && data.object_of_the_issue == '' ? '' :
                                    <>
                                        <div className="block_content">
                                        <h3>Object of the Issue</h3>
                                        <p dangerouslySetInnerHTML={{ __html: data?.object_of_the_issue }}></p>
                                        </div>
                                    </>
                            }

                        
                        
                            {
                                data && data?.promoters?.length == 0 ? '' :
                                    <>
                                        <div className="block_content block_footer">
                                        <h3>Promoters</h3>
                                        {data?.promoters?.map((item, index) => {
                                            return <p className="font-small text-primary" key={index}>{item}</p>
                                        })}
                                        <p className="font-small text-primary">{data?.lead_managers_and_registrars}</p>
                                        </div>
                                    
                                    </>
                            }
                        
                    </div>
                </div>
            </div>
        </section>
    );
}
