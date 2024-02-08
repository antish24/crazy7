import React from 'react'
import styles from './dropcards.module.css'

const DropCards = ({cards}) => {
  return (
    <div className={styles.cont}>
      {cards.map((l,i)=><img className={styles.card} alt='card' style={{transform:`rotateZ(${i*.3}deg)`}} key={l._id} src={`/${l.type}/${l.value}.png`}/>)}
    </div>
  )
}

export default DropCards