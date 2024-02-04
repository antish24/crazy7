import React, {useEffect, useState} from 'react';
import Players from '../../components/Cards/Players/Players';
import Player from '../../components/Cards/Player/Player';
import DeckCards from '../../components/Cards/DeckCards/DeckCards';
import styles from './game.module.css';

const Game = () => {

  const [pileCards, setPileCards] = useState ([
    {type: 'heart', value: 'A', id: 1},
    {type: 'heart', value: '2', id: 2},
    {type: 'heart', value: '3', id: 3},
    {type: 'heart', value: '4', id: 4},
    {type: 'heart', value: '5', id: 5},
    {type: 'heart', value: '6', id: 6},
    {type: 'heart', value: '7', id: 7},
    {type: 'heart', value: '8', id: 8},
    {type: 'heart', value: '9', id: 9},
    {type: 'heart', value: '10', id: 10},
    {type: 'heart', value: 'J', id: 11},
    {type: 'heart', value: 'Q', id: 12},
    {type: 'heart', value: 'K', id: 13},

    {type: 'flowers', value: 'A', id: 14},
    {type: 'flowers', value: '2', id: 15},
    {type: 'flowers', value: '3', id: 16},
    {type: 'flowers', value: '4', id: 17},
    {type: 'flowers', value: '5', id: 18},
    {type: 'flowers', value: '6', id: 19},
    {type: 'flowers', value: '7', id: 20},
    {type: 'flowers', value: '8', id: 21},
    {type: 'flowers', value: '9', id: 22},
    {type: 'flowers', value: '10', id: 23},
    {type: 'flowers', value: 'J', id: 24},
    {type: 'flowers', value: 'Q', id: 25},
    {type: 'flowers', value: 'K', id: 26},

    {type: 'spare', value: 'A', id: 27},
    {type: 'spare', value: '2', id: 28},
    {type: 'spare', value: '3', id: 29},
    {type: 'spare', value: '4', id: 30},
    {type: 'spare', value: '5', id: 31},
    {type: 'spare', value: '6', id: 32},
    {type: 'spare', value: '7', id: 33},
    {type: 'spare', value: '8', id: 34},
    {type: 'spare', value: '9', id: 35},
    {type: 'spare', value: '10', id: 36},
    {type: 'spare', value: 'J', id: 37},
    {type: 'spare', value: 'Q', id: 38},
    {type: 'spare', value: 'K', id: 39},

    {type: 'dimond', value: 'A', id: 40},
    {type: 'dimond', value: '2', id: 41},
    {type: 'dimond', value: '3', id: 42},
    {type: 'dimond', value: '4', id: 43},
    {type: 'dimond', value: '5', id: 44},
    {type: 'dimond', value: '6', id: 45},
    {type: 'dimond', value: '7', id: 46},
    {type: 'dimond', value: '8', id: 47},
    {type: 'dimond', value: '9', id: 48},
    {type: 'dimond', value: '10', id: 49},
    {type: 'dimond', value: 'J', id: 50},
    {type: 'dimond', value: 'Q', id: 51},
    {type: 'dimond', value: 'K', id: 52},
  ]);

  const [players,setPlayers]=useState([
    {id:1,turn:true,cards:[]},
    {id:2,turn:false,cards:[]},
    // {id:3,turn:false,cards:[]},
    // {id:4,turn:false,cards:[]},
    // {id:5,turn:false,cards:[]},
    // {id:6,turn:false,cards:[]},
  ])
  
  const start = () => {
    for (let x = 1; x <= 2; x++) {
      for (let y = 1; y <= 5; y++) {
        const clickedCard = pileCards.find((card) => card.id === (x - 1) * 5 + y);
        if (clickedCard) {
          setPlayers((prevPlayers) => {
            const updatedPlayers = prevPlayers.map((player) => {
              if (player.id === x) {
                const cardExists = player.cards.some((card) => card.id === clickedCard.id);
                if (!cardExists) {
                  player.cards.push(clickedCard);
                }
              }
              return player;
            });
            return updatedPlayers;
          });
          setPileCards((prevCards) => prevCards.filter((card) => card.id !== clickedCard.id));
        }
      }
    }
  };

  const [dropCards, setDropCards] = useState ([]);
  const [CardType, setCardType] = useState ('');
  const [CantOrder, setCantOrder] = useState (true);

  const orderBy8=(e)=>{
    setCantOrder(true)
    setCardType(e)
  }

  const FinishTurn=()=>{
    setPlayers((prev) => {
      return prev.map((player) => {
        if (player.id === 1) {
          player.turn=false
        }
        return player;
      });
    });
  }

  const dropCard = (playerId,cardID) => {
    FinishTurn()
    const clickedCard = players.find(l => l.id===playerId).cards.find(l=>l.id===cardID);
    if (!clickedCard) {return;}
    if (dropCards.length > 0) {
      const lastDroppedCard = dropCards[dropCards.length - 1];
      if(clickedCard.value==='8'){
        setCantOrder(false)
        setDropCards (prev => [...prev, clickedCard]);
        setPlayers((prev) => {
          return prev.map((player) => {
            if (player.id === playerId) {
              const updatedCards = player.cards.filter((card) => card.id !== cardID);
              return { ...player, cards: updatedCards };
            }
            return player;
          });
        });

      }
      else if ((CardType === clickedCard.type || lastDroppedCard.value === clickedCard.value)) {
        setDropCards (prev => [...prev, clickedCard]);
        setCardType(clickedCard.type)
        setPlayers((prev) => {
          return prev.map((player) => {
            if (player.id === playerId) {
              const updatedCards = player.cards.filter((card) => card.id !== cardID);
              return { ...player, cards: updatedCards };
            }
            return player;
          });
        });
      }
    } else {
      setDropCards (prev => [...prev, clickedCard]);
      setCardType(clickedCard.type)
      setPlayers((prev) => {
        return prev.map((player) => {
          if (player.id === playerId) {
            const updatedCards = player.cards.filter((card) => card.id !== cardID);
            return { ...player, cards: updatedCards };
          }
          return player;
        });
      });
    }
  };

  const drawCard = (playerId, cardId) => {
    const clickedCard = pileCards.find((card) => card.id === cardId);
    if (!clickedCard) return;

    setPileCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
  
    setPlayers((prev) => {
      return prev.map((player) => {
        if (player.id === playerId) {
          const cardExists = player.cards.some((card) => card.id === clickedCard.id);
          if (!cardExists) {
            player.cards.push(clickedCard);
          }
        }
        return player;
      });
    });
  };

  return (
    <div className={styles.cont}>
      <div className={styles.players}>
        {players.filter(l=>l.id!==1).map(l=><Players key={l.id} {...l}/>)}
      </div>
      <DeckCards
        pileCards={pileCards}
        drawCard={drawCard}
        dropCards={dropCards}
        type={CardType}
        data={players.find(l=>l.id===1)}
      />
      <button onClick={start}></button>
      <Player data={players.find(l=>l.id===1)} dropCard={dropCard} CantOrder={CantOrder} Order={orderBy8}/>
    </div>
  );
};

export default Game;
