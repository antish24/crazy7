import React from 'react'
import styles from './playercard.module.css'

const PlayerCard = ({left,dropCard,...l}) => {
  return (
    <div className={styles.cont} style={{left:left}} onClick={()=>dropCard(l.id)}>
        <img src={`/${l.type}/${l.value}.png`} alt='card' className={styles.img}/>
    </div>
  )
}

export default PlayerCard