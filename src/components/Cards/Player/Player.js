import React from 'react'
import styles from './palyer.module.css'
import PlayerCard from '../PlayerCard/PlayerCard'

const Player = ({playerCard,dropCard}) => {
  
  return (
    <div className={styles.cont}>
      <div className={styles.playercard}>
        {playerCard.map((l,index)=><PlayerCard dropCard={dropCard} left={index * 45} {...l}/>)}
      </div>
    </div>
  )
}

export default Player