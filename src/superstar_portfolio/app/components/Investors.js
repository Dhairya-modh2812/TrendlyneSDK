import React from "react";
import { Progress } from "../components/Progress";
import { Link } from "react-router-dom";
import { slugify } from "../../../_helpers/Functional";

export function Investors(props, posts) {
  const { maxValue } = props;

  const superstarId = props?.data?.superstarId;
  const superstarName = slugify(props?.data?.Superstar_name)

  const urlHash = window?.TLSuperstar?.urlHash;
  let toUrl = `/superstar/${superstarId}/${superstarName}/`;

  if (urlHash) {
    toUrl = `${toUrl}${urlHash}`;
  }

  const DOTS = "...";
  return (
    <>
      <Link to={toUrl}>
        <div className="investors_block">
          <div className="investors_block_body">
          <div className="top_content">
            <div className="block_header">
              <h6>
                {props?.data?.Superstar_name.length > 30
                  ? props?.data?.Superstar_name.slice(0, 30).concat(DOTS)
                  : props?.data?.Superstar_name}
              </h6>

              {props?.data?.customCategory && <lable className="portfolio_categories">{props?.data?.customCategory}</lable>}
            </div>
            <div className="row">
              <div className="col-6">
                <span>Networth Cr</span>
                <p>
                  {(props?.data?.net_worth / 10000000).toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div className="col-6 right_content p_0">
                <span>Company Holdings</span>
                <p>{props?.data?.Companies_Held}</p>
              </div>
            </div>
          </div>
          <Progress width={50} processData={props?.data} maxValue={maxValue} />
          </div>
          <div className="view-more-container">
              <div className="view-more-btn">View More</div>
          </div>
        </div>
      </Link>
    </>
  );
}