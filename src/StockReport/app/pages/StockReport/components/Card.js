import React from 'react'
import styles from './Card.module.scss';

function Card(props) {
  const {title} = props;
  return (
    <div className='card position-relative'>
        <div className='card-body'>
            <div className={`card-subtitle ${styles.cardLabel} f-16`} >{title}</div>
            {props.children}
        </div>
    </div>
  )
}

export default Card