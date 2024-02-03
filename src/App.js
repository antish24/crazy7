import {Route, Routes} from 'react-router-dom';
import './App.css';
import {useLocation} from 'react-router-dom'
import io from 'socket.io-client';
import { useEffect } from 'react';
import { BACKENDURL } from './helper/Url';
import Game from './pages/game/Game';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const socket = io(BACKENDURL);

function App () {

useEffect(() => {
  socket.on('connect', () => {
    console.log('Connected to the server');
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from the server');
  });

}, []);
  const {pathname} = useLocation();
  const hideNavbar = ['/','/'];
  const hideChatbar = ['/','/home','/account'];
  const shouldHideNavbar = hideNavbar.includes (pathname);
  const shouldHideChatbar = hideChatbar.includes (pathname);
  return (
    <DndProvider backend={HTML5Backend}>
    <div className="App">
      <div className="Layout">
      {!shouldHideNavbar && '<TopNav/>'}
        <Routes>
          <Route element={<Game socket={socket}/>} path="/" />
        </Routes>
        {!shouldHideChatbar && ''}
      </div>
    </div>
    </DndProvider>
  );
}

export default App;


