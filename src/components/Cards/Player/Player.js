import React from 'react'
import styles from './palyer.module.css'
import PlayerCard from '../PlayerCard/PlayerCard'

const Player = ({data,dropCard,Order,CantOrder,FinishTurn}) => {
  const types=[
    {id:1,type:'heart'},
    {id:3,type:'flowers'},
    {id:2,type:'dimond'},
    {id:4,type:'spare'},
  ]
  return (
    <div className={styles.cont}>
        <button className={styles.drawbtn} onClick={()=>FinishTurn(data.id)} disabled={data.draw||!(data.turn)}>{data.draw?"Draw":"Fin"}</button>
      <div className={styles.choosetype} style={{display:CantOrder?"none":"flex"}}>
        <div className={styles.list}>
        {
          types.map(l=><img src={`${l.type}/${l.type}.png`} key={l.id} className={styles.cardtypepic} onClick={()=>Order(l.type)}/>)
        }
        </div>
      </div>
      <div className={styles.playercard}>
        {data.cards.map((l,index)=><PlayerCard key={l.id} playerId={data.id} turn={data.turn} Order={Order} dropCard={dropCard} left={index * 45} {...l}/>)}
      </div>
    </div>
  )
}

export default Player