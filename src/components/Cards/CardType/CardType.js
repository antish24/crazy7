import React from 'react'
import styles from './cardtype.module.css'

const CardType = ({type}) => {
  return (
    <div className={styles.cont}>
        {type&&<img src={`/${type}/${type}.png`} alt='ctype' className={styles.img}/>}
    </div>
  )
}

export default CardType