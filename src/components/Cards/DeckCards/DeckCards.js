import React from 'react'
import PileCards from '../PileCards/PileCards'
import DropCards from '../DropCards/DropCards'
import styles from './deckcards.module.css'
import CardType from '../CardType/CardType'

const DeckCards = ({drawCard,pileCards,dropCards}) => {
  return (
    <div className={styles.cont}>
        <CardType/>
        <PileCards drawCard={drawCard} pileCards={pileCards}/>
        <DropCards dropCards={dropCards}/>
    </div>
  )
}

export default DeckCards