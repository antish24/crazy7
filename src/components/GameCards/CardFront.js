import React from 'react'
import styles from './cardfront.module.css'

const CardFront = ({droping,Drop,index,...l}) => {
  return (
    <button className={styles.cont} style={{left:`${index*40}px`}} disabled={droping} onClick={()=>Drop(l._id,l.type,l.value)}>
        <img src={`/${l.type}/${l.value}.png`} alt='card' className={styles.card}/>
    </button>
  )
}

export default CardFront