import React from 'react';
import waldoImg from '../../../img/waldo_portrait.png';
import odlawImg from '../../../img/odlaw_portrait.png';

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
      <h1>Where is Waldo ?</h1>
      <img
        className="waldo-portrait"
        src={waldoImg}
        alt="Waldo portrait"
        style={{
          width: '72px',
          height: '82px',
        }}
      />
      <img
        className="odlaw-portrait"
        src={odlawImg}
        alt="Odlaw portrait"
        style={{
          width: '72px',
          height: '82px',
        }}
      />
    </div>
  );
}

export default GameHeader;
