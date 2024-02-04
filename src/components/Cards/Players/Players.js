import React from 'react';
import styles from './players.module.css';

const Players = (l) => {
  return (
    <div className={styles.cont}>
      <div className={styles.box}>
        <div className={styles.pic}  style={{borderColor:l.turn?"green":"whitesmoke"}}></div>
        <div className={styles.cards}>
          {l.cards.map ((l,index) => (
            <img
              key={index}
              src="/cardback.png"
              alt="card"
              style={{left:index *7}}
              className={styles.img}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Players;
