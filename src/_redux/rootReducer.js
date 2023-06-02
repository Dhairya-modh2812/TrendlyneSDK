import {combineReducers} from "redux";
import {CommonSlices} from "./common/slices";
import {AlphaAlertsSlices} from "./alpha_alerts/slices";
import {PriceTargetAlertsSlices} from "./price_target_alerts/slices";
import {XYComparison} from "./xy_comparison/slices";
import {SuperstarSlices} from "./superstar_portfolio/slices";
import { IpoSlices } from "./ipo/slices";


export const rootReducer = combineReducers({
    common: CommonSlices.reducer,
    alpha_alerts: AlphaAlertsSlices.reducer,
    price_target_alerts: PriceTargetAlertsSlices.reducer,
    xy_comparison: XYComparison.reducer,
    superstar_portfolio: SuperstarSlices.reducer,
    ipo: IpoSlices.reducer,
});
