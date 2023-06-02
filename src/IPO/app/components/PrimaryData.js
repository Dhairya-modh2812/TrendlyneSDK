import React from "react";
import moment from "moment";

export function PrimaryData(props) {

    const { data } = props

    const biddingDates = (open, close, bidding_dates) => {
        if (bidding_dates == null)

            if (open == null && close == null) {
                return <>-</>;
            }
            else {
                return <>{open && moment(open).format('DD MMM YYYY')} - {close && moment(close).format('DD MMM YYYY')}</>;
            }
        else {
            return <>{moment(bidding_dates).isValid() ? moment(bidding_dates).format('DD MMM YYYY') : bidding_dates}</>
        }
    }


    return (
        <>
            <div className="IPO_Primary_data">
                <div className="container">
                    <ul className="flex">
                    {data?.bidding_dates == null && data?.bidding_date_open == null && data?.bidding_date_close == null ? <></> :
                       <li className="block_content">
                            <span className="details-primary-text">{biddingDates(data?.bidding_date_open, data?.bidding_date_close, data?.bidding_dates)}&nbsp;</span>
                            <span className="details-secondary-text">Bidding Dates</span>
                       </li>
                   }
                        <li className="block_content">
                                {
                                    data && data.subscription_value == null && data.subscription_text == null ? '' :
                                    <>
                                        <span className={`text-${data?.subscription_color} details-primary-text`}>
                                            <span>{data?.subscription_value + 'x'}</span>
                                            <span>{data?.subscription_text}</span>&nbsp;
                                        </span>
                                        <span className="details-secondary-text">Subscription</span>
                                    </>
                                }
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}