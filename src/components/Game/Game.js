import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getTargetPosition } from '../../firebase/firebase';
import GameHeader from './GameHeader/GameHeader';
import GameTarget from './GameTarget/GameTarget';
import useCharFound from './useCharFound/useCharFound';

function Game() {
  const [charPosition, setCharPosition] = useState({});
  const [showTarget, setShowTarget] = useState([false, [0, 0]]);
  const [timer, setTimer] = useState(0);
  const { charFound, checkClickPosition } = useCharFound();
  const navigate = useNavigate();

  function increaseTimer() {
    const previousValue = timer;
    setTimer(previousValue + 1);
  }

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      const targetData = await getTargetPosition();
      if (!ignore) setCharPosition(targetData);
    }

    fetchData();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(increaseTimer, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    // When user found all characters...
    if (charFound[0] === true && charFound[1] === true) {
      navigate('/gameend', { state: timer });
    }
  }, [charFound]);

  const setTargetPosition = (e) => {
    const positionX = e.nativeEvent.layerX;
    const positionY = e.nativeEvent.layerY;

    setShowTarget([true, [positionX, positionY]]);
  };

  const isTargetPosition = () => {
    if (charPosition === undefined || charPosition === 'error') {
      return (
        <p>Error loading game data, please reload the page</p>
      );
    }

    return (
      <img
        onClick={setTargetPosition}
        className="game-image"
        src="https://3hwuuuxcz5o651g144s0kw10-wpengine.netdna-ssl.com/wp-content/uploads/2016/07/G3M_Wheres_Waldo.jpg"
        alt="where is waldo"
      />
    );
  };

  const isShowGameTarget = () => {
    if (showTarget[0] === true) {
      return (
        <GameTarget
          position={showTarget[1]}
          onGameTargetButtonClick={(e) => { checkClickPosition(showTarget[1], charPosition, e); }}
          charactersFound={charFound}
        />
      );
    }

    return null;
  };

  return (
    <div className="game">
      <GameHeader charactersFound={charFound} />
      <div
        className="game-area"
        style={
        {
          position: 'relative',
        }
        }
      >
        {isTargetPosition()}
        {isShowGameTarget()}
      </div>
    </div>
  );
}

export default Game;
