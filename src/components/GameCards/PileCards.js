import React from 'react'
import styles from './pilecards.module.css'

const PileCards = ({cards,drawCard,loading}) => {

  return (
    <div className={styles.cont}>
      {loading?"loading":cards.map((l,i)=><img 
      className={styles.card} 
      onClick={()=>loading?"":drawCard(l._id)} 
      alt='card' 
      style={{transform:`rotateZ(${i*.3}deg)`}} 
      key={l._id} src='/cardback.png'/>
      )}
    </div>
  )
}

export default PileCards