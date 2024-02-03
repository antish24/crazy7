import React from 'react'
import styles from './cardfront.module.css'
const CardFront = ({angle,...l}) => {
  return (
    <div className={styles.cont} style={{transform: `rotateZ(${angle}deg)`}}>
        <img src={`/${l.type}/${l.value}.png`} alt='card' className={styles.img}/>
    </div>
  )
}

export default CardFront