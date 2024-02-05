import React from 'react'
import styles from './cardback.module.css'

const CardBack = ({data,angle,drawCard,...l}) => {
  return (
    <div className={styles.cont} onClick={()=>(data.draw&&data.turn)?drawCard(data.id,l.id):""} style={{transform: `rotateZ(${angle}deg)`}}>
        <img src={`/cardback.png`} alt='card' className={styles.img}/>
    </div>
  )
}

export default CardBack