import React from 'react'
import styles from './cardback.module.css'

const CardBack = ({data,angle,drawCard,...l}) => {
  return (
    <div className={styles.cont} onClick={()=>data.turn?drawCard(1,l.id):""} style={{transform: `rotateZ(${angle}deg)`}}>
        <img src={`/cardback.png`} alt='card' className={styles.img}/>
    </div>
  )
}

export default CardBack