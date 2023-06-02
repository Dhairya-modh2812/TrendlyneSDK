import * as React from "react";

const RightCheckbox = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} {...props}>
    <path className="pta-checked-icon"
      style={{
        stroke: "none",
        fillRule: "evenodd",
        fill: "#006aff",
      }}
      d="M3.473 0h18.054A3.473 3.473 0 0 1 25 3.473v18.054A3.473 3.473 0 0 1 21.527 25H3.473A3.473 3.473 0 0 1 0 21.527V3.473A3.473 3.473 0 0 1 3.473 0Zm0 0"
    />
    <path
      style={{
        fill: "none",
        strokeWidth: 1.479583,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        stroke: "#fff",
        strokeOpacity: 1,
        strokeMiterlimit: 4
      }}
      d="M11 15.045 13.445 19 21 13"
      transform="scale(.78125)"
    />
  </svg>
);

export default RightCheckbox;
