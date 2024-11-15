import io from 'socket.io-client';
import React, { useState } from 'react';
import Chat from './Chat';
import './App.css';
import icon from './icon.png';

const socket = io.connect('http://localhost:3001');
function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);

  const joinroom = () => {
    if (username !== '' && room !== '') {
      socket.emit('join_room', room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <div>
            <img class="icon" src={icon} alt="logo" />
            <h1>LinkUp</h1>
            <p class="tagline">Your Instant Connection Network</p>
          </div>
          <h2>Join a Chat</h2>
          <input
            onChange={(event) => setUsername(event.target.value)}
            type="text"
            placeholder="Enter your name"
            name="text"
          />
          <input
            type="text"
            onChange={(event) => setRoom(event.target.value)}
            placeholder="Room ID..."
            name="text"
          />
          <button onClick={joinroom} type="submit">
            Join
          </button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
