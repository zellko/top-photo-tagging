import React from 'react';
import './GameTarget.css';

function GameTarget({ position, onGameTargetButtonClick }) {
  // console.log(position);
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
