import React, { useState } from "react";
import { CustomTableRows } from "./CustomTableRows";
import { BarChartComponent } from "./charts/BarChartComponent";
import { GaugeChartComponent } from "./charts/GaugeChartComponent";

export function IndividualAccordionDetail({
  headers,
  sub_headers,
  comparison,
  selectedTab,
  setSelectedTab,
  firstStock,
  secondStock,
  stocks,
}) {
  const [subSelectedTab, setSubSelectedTab] = useState(0);

  let filtered_headers = headers.filter((h, index) => index === selectedTab);
  let header_text = filtered_headers[0]?.key;

  let parent_headers_comparisons = [];
  if (comparison && comparison[header_text]) {
    for (const [key, value] of Object.entries(comparison[header_text])) {
      parent_headers_comparisons[key] = value;
    }
  }

  let sub_header_text = sub_headers[subSelectedTab];

  let first_four_objects = [];
  let last_two_objects = [];
  if (parent_headers_comparisons) {
    let sub_headers_comparison_length =
      parent_headers_comparisons[sub_header_text]?.length;
    first_four_objects = parent_headers_comparisons[sub_header_text]?.slice(
      0,
      4
    );


    if (first_four_objects) {

      for (const [key, value] of Object.entries(first_four_objects)) {
        let tempObject = {};
        tempObject.first_stock = value?.[firstStock];
        tempObject.second_stock = value?.[secondStock];
        tempObject.winner_stock = value.winner_pk
          ? value.winner_pk === firstStock
            ? "first"
            : "second"
          : "";
        Object.assign(tempObject, value);

        first_four_objects[key] = tempObject;
      }
    }

    if (
      sub_headers_comparison_length > 4 &&
      sub_headers_comparison_length <= 6
    ) {
      last_two_objects = parent_headers_comparisons[sub_header_text]?.slice(-2);

      if (last_two_objects) {
        for (const [key, value] of Object.entries(last_two_objects)) {
          let tempObject = {};
          tempObject.first_stock = value?.[firstStock];
          tempObject.second_stock = value?.[secondStock];
          tempObject.winner_stock = value.winner_pk
            ? value.winner_pk === firstStock
              ? "first"
              : "second"
            : "";
          Object.assign(tempObject, value);

          last_two_objects[key] = tempObject;
        }
      }
    }
  }

  return (
    <>
      <div className="itembody_content">
        <div className="section_growth">
          <div className="row">
            <div className="col-md-6 d-flex text-nowrap overflow-auto sub_header_buttons">
              {(() => {
                if (sub_headers && sub_headers.length > 0) {
                  return sub_headers.map((sub_header, index) => (
                    <button
                      key={index}
                      className={`individual_rounded_button btn mx-1 ${subSelectedTab === index ? "active" : ""
                        }`}
                      onClick={() => {
                        setSelectedTab(selectedTab);
                        setSubSelectedTab(index);
                      }}
                    >
                      {sub_header}
                    </button>
                  ));
                }
              })()}
            </div>
          </div>
          {(() => {
            if (first_four_objects && first_four_objects.length > 0) {
              return (
                <div className="row d-flex align-items-center">
                  <div className="col-md-6">
                    <BarChartComponent
                      first_four_objects={first_four_objects}
                      firstStock={firstStock}
                      secondStock={secondStock}
                      stocks={stocks}
                    />
                  </div>

                  <div className="col-md-6">
                    <table className="table comparison_table">
                      <tbody>
                        {(() => {
                          if (first_four_objects && first_four_objects.length > 0) {
                            return first_four_objects.map((individual, index) => (
                              <CustomTableRows
                                key={index}
                                index={index}
                                individual={individual}
                                length={first_four_objects?.length}
                              />
                            ));
                          }
                        })()}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            }
          })()}
        </div>

        {(() => {
          if (last_two_objects && last_two_objects.length > 0) {
            return (
              <div className="row d-flex align-items-center score_block">
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-6">
                      <GaugeChartComponent
                        object={last_two_objects[0]}
                        firstStock={firstStock}
                        secondStock={secondStock}
                        stocks={stocks}
                      />
                    </div>
                    <div className="col-md-6">
                      <GaugeChartComponent
                        object={last_two_objects[1]}
                        firstStock={firstStock}
                        secondStock={secondStock}
                        stocks={stocks}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <table className="table comparison_table">
                    <tbody>
                      {(() => {
                        if (last_two_objects && last_two_objects.length > 0) {
                          return last_two_objects.map((individual, index) => (
                            <CustomTableRows
                              key={index}
                              index={index}
                              individual={individual}
                              length={last_two_objects?.length}
                            />
                          ));
                        }
                      })()}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          }
        })()}
      </div>
    </>
  );
}
