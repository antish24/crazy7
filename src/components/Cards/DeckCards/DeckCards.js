import React from 'react'
import PileCards from '../PileCards/PileCards'
import DropCards from '../DropCards/DropCards'
import styles from './deckcards.module.css'
import CardType from '../CardType/CardType'

const DeckCards = ({data,drawCard,pileCards,dropCards,type}) => {
  return (
    <div className={styles.cont}>
        <CardType type={type}/>
        <PileCards drawCard={drawCard} data={data} pileCards={pileCards}/>
        <DropCards dropCards={dropCards}/>
    </div>
  )
}

export default DeckCards