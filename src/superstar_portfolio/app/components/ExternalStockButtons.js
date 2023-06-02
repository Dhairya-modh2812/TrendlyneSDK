import React, { useContext } from "react";
import superstarContext from "../context/superstar/superstarContext";
import Dropdown from 'react-bootstrap/Dropdown';

const ExternalStockButtons = (props) => {

    const { externalView } = useContext(superstarContext);

    const { row = {} } = props;

    let stockInfo = {
        nseCode: row.NSEcode,
        bseCode: row.BSEcode,
        isin: row.ISIN,
        stockPk: row.stock_id,
    }
    if (row.extraItems && typeof row.extraItems === 'object') stockInfo = {...stockInfo, ...row.extraItems};
    
    let externalConfigs = {};

    if (externalView && window.TLSuperstar) {
        externalConfigs = window.TLSuperstar.getConfigs();
    }

    const callSummaryPopup = () => {
        if(typeof(externalConfigs.moreCallback) === 'function') {
            externalConfigs.moreCallback(stockInfo);
            return;
        }

	let summaryConfig = {};
        if(window.TLSuperstar) {
            summaryConfig['theme'] = window.TLSuperstar.themeMode;
        }

        if(typeof(TLSummary) === 'object' && TLSummary !== null) {
            TLSummary?.triggerSummaryModal?.(undefined, undefined, undefined, undefined, undefined, undefined, undefined, stockInfo.stockPk, summaryConfig);
        }
    }

    return externalView ? 
        <div>
            <div className="external-button-container">
                {externalConfigs.buyCallback ? <button type="button" className="btn btn-sm btn-buy" onClick={() => externalConfigs.buyCallback(stockInfo)}>B</button> : null}
                {externalConfigs.sellCallback ? <button type="button" className="btn btn-sm btn-sell" onClick={() => externalConfigs.sellCallback(stockInfo)}>S</button> : null}
                {(externalConfigs.moreCallback || window.TLSummary?.triggerSummaryModal) ? <button type="button" className="btn btn-sm btn-more" onClick={callSummaryPopup}><span className="ellipsis-h" aria-hidden="true"></span></button> : null}
            </div>
        </div> : null
}

export default ExternalStockButtons;

export const MobileExternalStockButtons = (props) => {

    // CustomToggle is used because Dropdown.Toggle default is to use Button with primary color
    // we need to override the css and hover style. so CustomToggle is used
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <div
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
        >
            {children}
        </div>
    ));

    return (
        <div className="">
            <ExternalStockButtons {...props} />

            <Dropdown className="dropdown d-sm-none" align={"end"} drop="end">
                <Dropdown.Toggle as={CustomToggle} className="custom-dropdown" id="dropdown-basic">
                    <span className="p-2">
                        <span className="ellipsis-v" aria-hidden="true"></span>
                    </span>
                </Dropdown.Toggle>

                <Dropdown.Menu align={"start"}>
                    <Dropdown.Item>
                        <ExternalStockButtons {...props} />
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}
