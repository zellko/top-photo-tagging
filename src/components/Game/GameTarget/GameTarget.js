import React from 'react';
import './GameTarget.css';

function GameTarget({ position }) {
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
        <button type="button">Waldo</button>
        <button type="button">Odlaw</button>
      </div>
    </div>
  );
}
export default GameTarget;
