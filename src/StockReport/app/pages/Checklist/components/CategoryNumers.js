import React, { Fragment } from 'react'

function CategoryNumers(props) {
    let { yes, no, neutral} = props;
    let createJsx = '';
    if(yes != 0) {
        createJsx += yes;
    }
    if(no != 0) {
        createJsx = createJsx + ' | ' + no;
    }
    if(neutral != 0) {
        createJsx = createJsx + ' | ' + neutral
    }

    return (
        <Fragment>
            {/* {createJsx} */}
            { yes && yes != 0 ? <span className='text-success'> {yes}</span> : ''}
            { neutral && neutral != 0 ? <> | <span className='text-warning'>{neutral}</span></> : ''}
            { no && no != 0 ? <> | <span className='text-danger'>{no}</span></> : ''}
            
        </Fragment>
    )
}

export default CategoryNumers