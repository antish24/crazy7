import {Route, Routes} from 'react-router-dom';
import './App.css';
import {useLocation} from 'react-router-dom'
import io from 'socket.io-client';
import { useEffect } from 'react';
import { BACKENDURL } from './helper/Url';
import Landing from './pages/Landing/LandingPage';
import Home from './pages/Home/Home';
import Room from './pages/Room/Room';
import TopNav from './components/TopNav/TopNav';
import Account from './pages/Account/Account';
import PageNotFound from './pages/404/PageNotFound';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Game from './pages/Gamepage/Game';

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
      {!shouldHideNavbar && <TopNav/>}
        <Routes>
          <Route element={<Landing socket={socket}/>} path="/" />
          <Route element={<Home socket={socket}/>} path="/home" />
          <Route element={<Game socket={socket}/>} path="/game/:gamecode" />
          <Route element={<Room socket={socket}/>} path="/room/:gamecode" />
          <Route element={<Account socket={socket}/>} path="/account" />
          <Route element={<PageNotFound/>} path="*" />
        </Routes>
        {!shouldHideChatbar && ''}
      </div>
    </div>
    </DndProvider>
  );
}

export default App;


