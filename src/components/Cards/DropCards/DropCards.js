import React from 'react'
import styles from './dropcards.module.css'
import CardFront from '../CardFront/CardFront'

const DropCards = ({dropCards}) => {
  return (
    <div className={styles.cont}>
      {dropCards.map((l,index)=><CardFront key={l.id} angle={index * .4} {...l}/>)}
    </div>
  )
}

export default DropCards