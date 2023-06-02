import React, { useContext } from "react";
import { useSelector } from "react-redux";
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { Link } from "react-router-dom";
import './Breadcrumbs.scss'

export function Breadcrumbs(props) {
  const {data} = props
  return (
    <>
      <div className="page_footer">
          <div className="container">  
            <Breadcrumb>
              <Breadcrumb.Item linkProps={{ to: "/dashboard/" }} linkAs={Link} >IPO</Breadcrumb.Item>
              <Breadcrumb.Item active>{data?.company_name}</Breadcrumb.Item>
            </Breadcrumb>          
          </div>
      </div>
    </>
  );
}
