import React, {useEffect, useContext} from 'react'
import MarketBulkBlockDeals from '../components/GroupBulkBlockDealsTab/BulkBlockDeals';
import superstarContext from "../context/superstar/superstarContext";

function GroupBulkBlockDeals() {

    const { externalView, superstarGroupBulkBlockDealsUrl } = useContext(superstarContext);

    useEffect(() => {
        if (!externalView) document.title = 'Bulk and Block Deals';
    }, [])
  return (
    <div className="investors_header">
        <div className="container">  
            <div className="row align-items-center">
                <div className="col-md-12">
                    <h3> Bulk and Block Deals</h3>                            
                    <div className="block_content">
                        <p>See most recent Bulk or Block deals made on NSE and BSE exchange.</p>
                    </div>
                </div>                     
            </div>  
            <MarketBulkBlockDeals />                        
        </div>
    </div>  
  )
}

export default GroupBulkBlockDeals