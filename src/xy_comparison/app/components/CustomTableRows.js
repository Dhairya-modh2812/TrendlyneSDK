import React from "react";
import winner_x from "../../../_assets/images/xy_comparison/winner_x.svg";
import winner_y from "../../../_assets/images/xy_comparison/winner_y.svg";
import { NumberDecimal } from "../../../_helpers/CommonFunctions"
import { TickIcony } from "./TickIcony";
import { TickIconx } from "./TickIconx";

export function CustomTableRows({ index, individual, length }) {

    return (
        <tr className={`tab_content ${index === (length - 1) ? 'border-bottom-0' : ''}`}>
            <td width="50%">
                <h4>
                    <span className="fs-6 fw-bold mb-1 comparison-text">
                        {individual?.insight || '-'}&nbsp;
                    </span>
                    <span className="comparison-sub-text">
                        {'in ' + individual?.verbose?.lstr}
                    </span>
                </h4>
            </td>
            <td width="20%" align="right">
                <div className="mb-3 mt-3 d-flex align-items-center justify-content-end">
                    {individual?.winner_stock && individual.winner_stock === 'first'
                        ? <TickIconx></TickIconx>
                        : ''}
                    <span className="x_text_color mx-1">{NumberDecimal(individual?.first_stock)}</span>

                </div>
            </td>
            <td width="20%" align="right">
                <div className="mb-3 mt-3 d-flex align-items-center justify-content-end">
                    {individual?.winner_stock && individual.winner_stock === 'second'
                        ? <TickIcony></TickIcony>
                        : ''}
                    <span className="y_text_color mx-1">{NumberDecimal(individual?.second_stock)}</span>
                </div>
            </td>
        </tr>
    );
}
