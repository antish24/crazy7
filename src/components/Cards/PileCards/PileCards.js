import React from 'react'
import styles from './pilecards.module.css'
import CardBack from '../CardBack/CardBack'

const PileCards = ({data,pileCards,drawCard}) => {

  return (
    <div className={styles.cont}>
      {pileCards.map((l,index)=><CardBack drawCard={drawCard} data={data} key={l.id} angle={index * 0.32} {...l}/>)}
    </div>
  )
}

export default PileCards