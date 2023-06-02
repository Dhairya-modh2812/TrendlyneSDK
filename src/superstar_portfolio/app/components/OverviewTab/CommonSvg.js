import React, { useContext } from "react";

export function EntryIcon(props) {


  return (
    <>
      <svg className={props.className} width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
        <g transform="rotate(180 18 18)" fill="none" fillRule="evenodd">
          <circle fill="#0CC191" opacity=".1" cx="18" cy="18" r="18" />
          <path d="M23.834 12.166 12.166 23.834m-.17-6.193.17 6.193 6.193.17" stroke="#0CC191" strokeWidth="1.083" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </>
  );
}

export function ExitIcon(props) {
  return (
    <>
      <svg className={props.className} width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fillRule="evenodd">
          <circle fill="#EB3B00" opacity=".1" cx="18" cy="18" r="18" />
          <path d="M23.834 12.166 12.166 23.834m-.17-6.193.17 6.193 6.193.17" stroke="#EB3B00" strokeWidth="1.083" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </>
  );
}

export function Increase(props) {
  return (
    <>

      <svg className={props.className} width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.374 9.429a.627.627 0 0 0 .578-.4.665.665 0 0 0-.135-.707l-5.375-5.56A.615.615 0 0 0 6 2.571a.615.615 0 0 0-.442.19L.183 8.321a.665.665 0 0 0-.135.706c.097.242.325.4.578.4h10.748z" fill="#00A25B" fillRule="evenodd" />
      </svg>

    </>
  );
}

export function Decrease(props) {
  return (
    <>
      <svg className={props.className} width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.374 2.571c.253 0 .481.159.578.4a.665.665 0 0 1-.135.707l-5.375 5.56a.615.615 0 0 1-.442.19.615.615 0 0 1-.442-.19L.183 3.679a.665.665 0 0 1-.135-.706.627.627 0 0 1 .578-.4h10.748z" fill="#FC5A5A" fillRule="evenodd" />
      </svg>
    </>
  );
}


