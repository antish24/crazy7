import React, { useEffect, useState } from 'react'
import Players from '../../components/Cards/Players/Players'
import Player from '../../components/Cards/Player/Player'
import DeckCards from '../../components/Cards/DeckCards/DeckCards'
import styles from './game.module.css'

const Game = () => {

  const [dropCards,setDropCards]=useState([
    {type:'heart',value:"A",id:1},{type:'heart',value:"2",id:2},{type:'heart',value:"3",id:3},{type:'heart',value:"4",id:4},
    {type:'heart',value:"5",id:5},{type:'heart',value:"6",id:6},{type:'heart',value:"7",id:7},{type:'heart',value:"8",id:8},
    {type:'heart',value:"9",id:9},{type:'heart',value:"10",id:10},{type:'heart',value:"J",id:11},{type:'heart',value:"Q",id:12},
    {type:'heart',value:"K",id:13},
  ])

  const [playerCards,setPlayerCards]=useState([
    {type:'flowers',value:"A",id:14},{type:'flowers',value:"2",id:15},{type:'flowers',value:"3",id:16},{type:'flowers',value:"4",id:17},
    {type:'flowers',value:"5",id:18},{type:'flowers',value:"6",id:19},{type:'flowers',value:"7",id:20},{type:'flowers',value:"8",id:21},
    {type:'flowers',value:"9",id:22},{type:'flowers',value:"10",id:23},{type:'flowers',value:"J",id:24},{type:'flowers',value:"Q",id:25},
    {type:'flowers',value:"K",id:26},
  ])

  const [pileCards,setPileCards]=useState([
    {type:'spare',value:"A",id:27},{type:'spare',value:"2",id:28},{type:'spare',value:"3",id:29},{type:'spare',value:"4",id:30},
    {type:'spare',value:"5",id:31},{type:'spare',value:"6",id:32},{type:'spare',value:"7",id:33},{type:'spare',value:"8",id:34},
    {type:'spare',value:"9",id:35},{type:'spare',value:"10",id:36},{type:'spare',value:"J",id:37},{type:'spare',value:"Q",id:38},
    {type:'spare',value:"K",id:39},
    {type:'dimond',value:"A",id:40},{type:'dimond',value:"2",id:41},{type:'dimond',value:"3",id:42},{type:'dimond',value:"4",id:43},
    {type:'dimond',value:"5",id:44},{type:'dimond',value:"6",id:45},{type:'dimond',value:"7",id:46},{type:'dimond',value:"8",id:47},
    {type:'dimond',value:"9",id:48},{type:'dimond',value:"10",id:49},{type:'dimond',value:"J",id:50},{type:'dimond',value:"Q",id:51},
    {type:'dimond',value:"K",id:52},
  ])

  const [CardType,setCardType]=useState('')

  const dropCard=(id)=>{
    const clickedCard = playerCards.find((card) => card.id === id)
    if(!clickedCard)return
    if (dropCards.length > 0) {
      const lastDroppedCard = dropCards[dropCards.length - 1];
        if (lastDroppedCard.type === clickedCard.type || lastDroppedCard.value === clickedCard.value || lastDroppedCard.value===8) {
          setDropCards((prev) => [...prev, clickedCard]);
          setPlayerCards((prevCards) => prevCards.filter((card) => card.id !== id));
        }
  }
  else{
    setDropCards((prev) => [...prev, clickedCard]);
    setPlayerCards((prevCards) => prevCards.filter((card) => card.id !== id));
  }
  }

  const drawCard=(id)=>{
    const clickedCard = pileCards.find((card) => card.id === id)
    if(!clickedCard)return
    setPileCards((prevCards) => prevCards.filter((card) => card.id !== id));
    setPlayerCards((prev) => [...prev, clickedCard]);
  }

  useEffect(()=>{
    if(pileCards.length === 0){
      const scrambledDropCards = dropCards.sort(() => Math.random() - 0.5);
      setPileCards(scrambledDropCards)
      setDropCards([])
    }
  },[dropCards,pileCards])

  return (
    <div className={styles.cont}>
        <div className={styles.players}>
        <Players/>
        <Players/>
        <Players/>
        <Players/>
        <Players/>
        </div>
        <DeckCards pileCards={pileCards} drawCard={drawCard} dropCards={dropCards}/>
        <Player playerCard={playerCards} dropCard={dropCard}/>
    </div>
  )
}

export default Game