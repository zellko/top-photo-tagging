import React from 'react';
import waldoImg from '../../../img/waldo_portrait.png';
import odlawImg from '../../../img/odlaw_portrait.png';
import './GameHeader.css';

function GameHeader(props) {
  const [isWaldoFound, isOdlawFound] = props.charactersFound;

  if (isWaldoFound) {
    const waldoPortrait = document.querySelector('.waldo-portrait');
    if (waldoPortrait) waldoPortrait.classList.add('found');
  }

  if (isOdlawFound) {
    const odlawPortrait = document.querySelector('.odlaw-portrait');
    if (odlawPortrait) odlawPortrait.classList.add('found');
  }

  return (
    <div className="game-header">
      <h1>Where are Waldo & Odlaw ?</h1>
      <img
        className="waldo-portrait"
        src={waldoImg}
        alt="Waldo portrait"
      />
      <img
        className="odlaw-portrait"
        src={odlawImg}
        alt="Odlaw portrait"
      />
    </div>
  );
}

export default GameHeader;
