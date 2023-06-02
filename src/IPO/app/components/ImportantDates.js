import React, { useMemo, useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { useTable, useSortBy } from "react-table";

import positive from "../../../_assets/images/IPO/positive.svg"
import negative from "../../../_assets/images/IPO/negative.svg"
import status from "../../../_assets/images/IPO/IPO_status.svg"

import drop_down from "../../../_assets/images/IPO/view_more.svg";
import drop_up from "../../../_assets/images/IPO/view_more.svg"
import All from "../../../_assets/images/IPO/view-all.svg"
import { Link } from "react-router-dom";

import { slugify } from "../../../_helpers/Functional";
import { NumberDecimal } from "../../../_helpers/CommonFunctions";
import moment from "moment";
import { dateRender } from "../../../_helpers/CommonFunctions";

export function ImportantDates(props) {

    const { data } = props;

    return (
        <>
            <div className="imp-dates">

                <table className="w-100">
                    <tbody>
                        <tr>
                            <th>Issue Open Date</th>
                            <td>
                                {dateRender(data?.open_date, 'DD MMM YYYY')}                      
                            </td>
                        </tr>
                        <tr>
                            <th>Issue close Date</th>
                            <td>
                            {dateRender(data?.close_date, 'DD MMM YYYY')}                            
                            </td>
                        </tr>
                        <tr>
                            <th>Allotment Date</th>
                            <td>
                            {dateRender(data?.allotment_date, 'DD MMM YYYY')}                           
                            </td>
                        </tr>
                        <tr>
                            <th>Refund Date</th>
                            <td>
                                {dateRender(data?.refund_date, 'DD MMM YYYY')}                          
                            </td>
                        </tr>
                        <tr>
                            <th>Demat Account Credit Date</th>
                            <td>
                            {dateRender(data?.demat_credit_date, 'DD MMM YYYY')}                          
                            </td>
                        </tr>
                        <tr>
                            <th>Listing Date</th>
                            <td>
                                {dateRender(data?.listing_date, 'DD MMM YYYY')}                           
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </>
    );
}