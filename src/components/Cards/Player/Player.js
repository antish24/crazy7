import React from 'react'
import styles from './palyer.module.css'
import PlayerCard from '../PlayerCard/PlayerCard'

const Player = ({data,dropCard,Order,CantOrder}) => {
  
  return (
    <div className={styles.cont}>
      <div className={styles.choosetype} style={{display:CantOrder?"none":"flex"}}>
      <select onChange={(e)=>Order(e.target.value)} disabled={CantOrder}>
        <option value='heart'>Heart</option>
        <option value='dimond'>Dimond</option>
        <option value='spare'>Spare</option>
        <option value='flowers'>Flowers</option>
      </select>
      </div>
      <div className={styles.playercard}>
        {data.cards.map((l,index)=><PlayerCard key={l.id} playerId={data.id} turn={data.turn} Order={Order} dropCard={dropCard} left={index * 45} {...l}/>)}
      </div>
    </div>
  )
}

export default Player