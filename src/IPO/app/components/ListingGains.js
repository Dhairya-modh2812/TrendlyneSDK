import { numRender, percentRender } from "../../../_helpers/CommonFunctions";

export function ListingGains(props) {

    const { data } = props;

    return (
        <>
            <div className="listing-gains">

                <table className="w-100">
                    <tbody>
                        <tr>
                            <th>Issue Price (adjusted)</th>
                            <td>                                
                                {numRender(data?.adjusted_issue_price)}
                            </td>
                        </tr>
                        <tr>
                            <th>Listing Open Price</th>
                            <td>                            
                            {numRender(data?.listing_open_price)}
                            </td>
                        </tr>
                        <tr>
                            <th>Listing Close Price</th>
                            <td>                            
                            {numRender(data?.listing_close_price)}
                            </td>
                        </tr>
                        <tr>
                            <th>Listing Gain%</th>
                            <td>
                            {percentRender(data?.listing_gain_percent)}                                
                            </td>
                        </tr>
                        <tr>
                            <th>Current Gain%</th>
                            <td>
                            {percentRender(data?.current_gain_percent)}                              
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}