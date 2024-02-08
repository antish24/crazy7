import React from 'react'
import styles from './playerscard.module.css'

const PlayersCard = ({turn,...l}) => {
  return (
    <div className={styles.cont}>
      <div className={styles.pic} style={{borderColor:turn===l._id?"green":'white'}}></div>
      <div className={styles.cardbox}>
        {l.cards.map((l,i)=><img className={styles.card} alt='card' style={{left:`${i*8}px`}} key={l._id} src='/cardback.png'/>)}
      </div>
    </div>
  )
}

export default PlayersCard