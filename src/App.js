import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Game from './components/Game/Game';
import { GameEnd } from './components/Game/GameEnd/GameEnd';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/gameend" element={<GameEnd />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
