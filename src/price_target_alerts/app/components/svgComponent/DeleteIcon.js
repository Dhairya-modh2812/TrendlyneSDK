import * as React from "react";

const DeleteIcon = (props) => (
    <svg width={34} height={34} xmlns="http://www.w3.org/2000/svg" {...props}>
        <g transform="translate(1 1)" fill="none" fillRule="evenodd">
            <rect stroke="#202020" strokeWidth={0.2} fill="#FFF" strokeLinecap="square" width={32} height={32} rx={4} className="pta-delete-icon" />
            <g strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.609} className="pta-delete-stroke">
                <path d="M21.478 11.435 20.375 21.91a1.217 1.217 0 0 1-1.21 1.09h-6.33c-.623 0-1.146-.47-1.21-1.09l-1.103-10.475m-1.522 0h14m-9.74 0V9.609A.61.61 0 0 1 13.87 9h4.26a.61.61 0 0 1 .61.609v1.826" stroke="#202020" />
                <path stroke="#FC5A5A" d="M16 14.174v6.391m2.739-6.391-.304 6.391m-5.174-6.391.304 6.391" className="pta-delete-stroke" />
            </g>
        </g>
    </svg>
);

export default DeleteIcon;
