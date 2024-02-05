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
    {id:1,turn:true,draw:true,cards:[]},
    {id:2,turn:false,draw:true,cards:[]},
    {id:3,turn:false,draw:true,cards:[]},
    {id:4,turn:false,draw:true,cards:[]},
    {id:5,turn:false,draw:true,cards:[]},
    // {id:6,turn:false,cards:[]},
  ])
  
  const changeTurn = (playerId) => {
    setPlayers((prevPlayers) => {
      const updatedPlayers = [...prevPlayers];
      const currentPlayerIndex = updatedPlayers.findIndex((player) => player.id === playerId);
  
      updatedPlayers[currentPlayerIndex].turn = false;
      updatedPlayers[(currentPlayerIndex + 1) % updatedPlayers.length].turn = true;
      updatedPlayers[(currentPlayerIndex + 1) % updatedPlayers.length].draw = true;
  
      return updatedPlayers;
    });
  };

  const FinishDraw=(playerId)=>{
    setPlayers((prevPlayers) => {
      const updatedPlayers = [...prevPlayers];
      const currentPlayerIndex = updatedPlayers.findIndex((player) => player.id === playerId);
  
      updatedPlayers[currentPlayerIndex].draw = false;
      return updatedPlayers;
    });

  }

  const start = () => {
    const updatedPileCards = [...pileCards];
    const updatedPlayers = [...players];

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < players.length; j++) {
        const randomIndex = Math.floor(Math.random() * updatedPileCards.length);
        const randomCard = updatedPileCards.splice(randomIndex, 1)[0];
        updatedPlayers[j].cards.push(randomCard);
      }
    }

    setPileCards(updatedPileCards);
    setPlayers(updatedPlayers);
  };

  const [dropCards, setDropCards] = useState ([]);
  const [CardType, setCardType] = useState ('');
  const [CantOrder, setCantOrder] = useState (true);

  const orderBy8=(e)=>{
    setCantOrder(true)
    setCardType(e)
  }

  useEffect(()=>{
    if(pileCards.length < 1){
      const lastDropCard = dropCards.pop();
      setPileCards([...dropCards]);
      setDropCards([lastDropCard]);
    }
  },[pileCards,dropCards])
  
  useEffect(() => {
    const emptyPlayers = players.filter((player) => player.cards.length === 0 && player.turn === false);
    if (emptyPlayers.length === 1) {
      alert(`Winner is Player ${emptyPlayers[0].id}`);
      window.location.reload()
    }
  }, [players]);

  const dropCard = (playerId,cardID) => {
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
        changeTurn(playerId)
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
        changeTurn(playerId)
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
      changeTurn(playerId)
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

    FinishDraw(playerId)
  };

  return (
    <div className={styles.cont}>
      <div className={styles.players}>
        {players
          .filter((player) => player.turn !==true)
          .map((player) => (
            <Players key={player.id} {...player} />
          ))}
      </div>
      <DeckCards
        pileCards={pileCards}
        drawCard={drawCard}
        dropCards={dropCards}
        type={CardType}
        data={players.find(l=>l.turn===true)}
      />
      <button onClick={start}>start</button>
      <Player FinishTurn={changeTurn} data={players.find(l=>l.turn===true)} dropCard={dropCard} CantOrder={CantOrder} Order={orderBy8}/>
    </div>
  );
};

export default Game;
