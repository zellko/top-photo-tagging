import React from 'react';
import './GameTarget.css';

function GameTarget({ position, onGameTargetButtonClick, charactersFound }) {
  // console.log(position);

  const [isWaldoFound, isOdlawFound] = charactersFound;
  const targetBtn = document.querySelectorAll('button');

  if (isWaldoFound) {
    if (targetBtn) targetBtn[0].classList.add('found');
  }

  if (isOdlawFound) {
    if (targetBtn) targetBtn[1].classList.add('found');
  }

  return (
    <div
      className="game-target"
      style={
        {
          position: 'absolute',
          left: position[0],
          top: position[1],
        }
        }
    >
      <div className="target" />
      <div className="gameTargetButton">
        <button type="button" onClick={onGameTargetButtonClick}>Waldo</button>
        <button type="button" onClick={onGameTargetButtonClick}>Odlaw</button>
      </div>
    </div>
  );
}
export default GameTarget;
