import React from 'react';
import { Link } from 'react-router-dom';
import waldoImg from '../../img/waldo_portrait.png';
import odlawImg from '../../img/odlaw_portrait.png';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <h2>Your goal is to find Waldo and Odlaw!</h2>
      <div className="home-img">
        <img src={waldoImg} alt="Waldo portrait" />
        <img src={odlawImg} alt="Ocdlaw portrait" />
      </div>
      <h3>You will be timed. Click Play game when you are ready</h3>
      <button type="button">
        {' '}
        <Link to="/game">Play Game</Link>
      </button>
    </div>
  );
}

export default Home;
