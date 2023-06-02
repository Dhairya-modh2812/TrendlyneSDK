import React from 'react'

function Loader() {
  return (
    <div className='loading-splash'>
        <div className="spinner-border text-primary" role="status">
            <span className="sr-only"></span>
        </div>
    </div>
  )
}

export default Loader;