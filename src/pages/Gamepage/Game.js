import React, { useEffect, useState } from 'react'
import styles from './game.module.css'
import PlayersCard from '../../components/GameCards/PlayersCard'
import PileCards from '../../components/GameCards/PileCards'
import DropCards from '../../components/GameCards/DropCards'
import CardFront from '../../components/GameCards/CardFront'
import {  FaCheck }from 'react-icons/fa'
import axios from 'axios'
import { BACKENDURL } from '../../helper/Url'
import {useParams } from 'react-router-dom'

const Game = ({socket}) => {
  const params =useParams()
  const gameCode=params.gamecode
  const [playerId,setPlayerId]=useState()
  const [playerData,setPlayerData]=useState([])
  const [playersData,setPlayersData]=useState([])
  const [pileCards,setPileCards]=useState([])
  const [dropCards,setDropCards]=useState([])
  const [gameTurn,setGameTurn]=useState()

  const [orderType,setOrderType]=useState('')
  const [orderTypeShow,setOrderTypeShow]=useState(false)
  const [dropLoading,setDropLoading]=useState(false)
  const [drawLoading,setDrawLoading]=useState(false)
  const [turnLoading,setTurnLoading]=useState(false)
  const cardTypes=[
    {id:1,type:'dimond'},
    {id:2,type:'spare'},
    {id:3,type:'heart'},
    {id:4,type:'flowers'}
  ]
  const getGameData=async()=>{
    try {
      let token = localStorage.getItem ('gameUserToken');
      const res=await axios.post(`${BACKENDURL}/game/gamedata`,{token:token,gameCode:gameCode})
      setPileCards(res.data.game.pileCards)
      setPlayerId(res.data.player._id)
      setDropCards(res.data.game.dropCards)
      setPlayerData(res.data.players.find(p=>p._id===res.data.player._id).cards)
      setPlayersData(res.data.players.filter(p=>p._id!==res.data.player._id))
    } catch (error) {
      console.log(error)
    }
  }

  const getTurn=async()=>{
    try {
      const res=await axios.post(`${BACKENDURL}/game/turn`,{gameCode:gameCode})
      setGameTurn(res.data.turn)
    } catch (error) {
      console.log(error)
    }
  }

  socket.on('drawed card', (data) => {
    getGameData()
  });

  socket.on('droped card', (data) => {
    getGameData()
    getTurn()
  });

  socket.on('game turn', (data) => {
    getTurn()
  });

  const DrawCardFun=async(cardId)=>{
    setDrawLoading(true)
    try {
      const res=await axios.post(`${BACKENDURL}/game/draw`,{playerId,cardId})
      console.log(res)
      socket.emit('draw card',{cardId,playerId});
      setDrawLoading(false)
    } catch (error) {
      setDrawLoading(false)
      alert(error.response.data.message)
    }
  }

  const DropCardFun=async(cardId)=>{
    setDropLoading(true)
    try {
      const res=await axios.post(`${BACKENDURL}/game/drop`,{playerId,cardId})
      console.log(res)
      socket.emit('drop card',{cardId,playerId});
      setDropLoading(false)
    } catch (error) {
      setDropLoading(false)
      alert(error.response.data.message)
    }
  }

  // useEffect(()=>{
  //   const getType=async()=>{
  //     const lastDroped=dropCards.length
  //   const lastDropCard=dropCards[lastDroped-1]
  //   console.log(lastDropCard.type)
  //   setOrderType(lastDropCard.type)
  //   }
  //   getType()
  // },[dropCards])

  useEffect(() => {
    const checkWinner = () => {
      const winner = playersData.find((player) => player.cards.length === 0);
      if (winner) {
        alert(`The winner is ${winner.userId.userName}!`);
      }
    };
  
    checkWinner();
  }, [playersData]);

  const DropLogic=async(cardId,type,value)=>{
    setTurnLoading(true)
    const lastDroped=dropCards.length
    const lastDropCard=dropCards[lastDroped-1]
    console.log('cardid',cardId,value,type)
    console.log(lastDroped)
    console.log(lastDropCard)
    if(value==='8'){
      setOrderTypeShow(true)
      DropCardFun(cardId)
    }
    else if(orderType===type){
      DropCardFun(cardId)
      setOrderType(type)
    }
    else if(lastDropCard.value===value){
      setOrderType(type)
      DropCardFun(cardId)
    }
    else if(lastDroped===0){
      DropCardFun(cardId)
    }
    else alert('Not corret card') 
    setTurnLoading(false)
  }

  const ChangeTurnFun=async()=>{
    try {
      const res=await axios.post(`${BACKENDURL}/game/changeturn`,{playerId})
      console.log(res)
      socket.emit('change turn',playerId);
      setTurnLoading(false)
    } catch (error) {
      setTurnLoading(false)
      alert(error.response.data.message)
    }
  }

  useEffect(()=>{
    const getGameData=async()=>{
      try {
        let token = localStorage.getItem ('gameUserToken');
        const res=await axios.post(`${BACKENDURL}/game/gamedata`,{token:token,gameCode:gameCode})
        setPileCards(res.data.game.pileCards)
        setPlayerId(res.data.player._id)
        setDropCards(res.data.game.dropCards)
        setPlayerData(res.data.players.find(p=>p._id===res.data.player._id).cards)
        setPlayersData(res.data.players.filter(p=>p._id!==res.data.player._id))
        setGameTurn(res.data.game.turn)
      } catch (error) {
        console.log(error)
      }
    }
    getGameData()
  },[gameCode])
  
  return (
    <div className={styles.cont}>
      <div className={styles.players}>
        {playersData.map((l)=><PlayersCard turn={gameTurn} key={l._id} {...l}/>)}
      </div>
      <div className={styles.deck}>
        <PileCards cards={pileCards} loading={drawLoading} drawCard={DrawCardFun}/>
        <DropCards cards={dropCards}/>
      </div>
      <div className={styles.player}>
        <div className={styles.order} style={{display:orderTypeShow?'flex':"none"}}>
          {cardTypes.map(l=><img onClick={()=>{setOrderType(l.type);setOrderTypeShow(false)}} src={`/${l.type}/${l.type}.png`} alt={l.type} className={styles.cardtypepic}/>)}
        </div>
        <div className={styles.playeraction}>
          <button className={styles.drawbtn}></button>
          <span className={styles.timer}>{orderType}</span>
          {turnLoading?"...":<FaCheck color='var(--first-color)' onClick={ChangeTurnFun}/>}
        </div>
        <div className={styles.playercards}>
          {playerData&&playerData.map((l,i)=><CardFront droping={dropLoading} Drop={DropLogic} key={l._id} index={i} {...l}/>)}
        </div>
      </div>
    </div>
  )
}

export default Game