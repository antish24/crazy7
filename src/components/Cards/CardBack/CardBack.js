import React from 'react'
import styles from './cardback.module.css'

const CardBack = ({angle,drawCard,...l}) => {
  return (
    <div className={styles.cont} onClick={()=>drawCard(l.id)} style={{transform: `rotateZ(${angle}deg)`}}>
        <img src={`/cardback.png`} alt='card' className={styles.img}/>
    </div>
  )
}

export default CardBack