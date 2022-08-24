import React, { useState, useEffect } from 'react';
import GameTarget from './GameTarget/GameTarget';
import { getTargetPosition } from '../../firebase/firebase';
// import useCharFound from './useCharFound/useCharFound';

function transformDbData(dbData) {
  // This function convert ladder data's to an array...
  const dbDataObject = dbData[0];
  const dbDataArray = [];

  for (const key in dbDataObject) {
    if (Object.hasOwnProperty.call(dbDataObject, key)) {
      dbDataArray.push([key, dbDataObject[key]]);
    }
  }

  // ...And sort the array
  dbDataArray.sort((a, b) => a[1] - b[1]);

  return dbDataArray;
}

function Game() {
  const [charPosition, setCharPosition] = useState({});
  const [showTarget, setShowTarget] = useState([false, [0, 0]]);
  // const { charFound, checkClickPosition } = useCharFound();

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      // Todo Add Try / Catch
      const targetData = await getTargetPosition();
      // console.log(targetData);
      if (!ignore) setCharPosition(targetData);
    }

    fetchData();

    return () => { ignore = true; };
  }, []);

  const setTargetPosition = (e) => {
    // console.log(`${e.nativeEvent.layerX} / ${e.nativeEvent.layerY}`);
    const positionX = e.nativeEvent.layerX;
    const positionY = e.nativeEvent.layerY;
    setShowTarget([true, [positionX, positionY]]);
  };

  const isTargetPosition = () => {
    // console.log(charPosition);
    if (charPosition[0] === undefined || charPosition === 'error') {
      return (
        <p>Error loading game data, please reload the page</p>
      );
    }

    return (
      <img
        onClick={setTargetPosition}
        className="game-image"
        style={
        {
          width: '100%',
        }
        }
        src="https://3hwuuuxcz5o651g144s0kw10-wpengine.netdna-ssl.com/wp-content/uploads/2016/07/G3M_Wheres_Waldo.jpg"
        alt="where is waldo"
      />
    );
  };

  const isShowGameTarget = () => {
    if (showTarget[0] === true) {
      return (
        <GameTarget position={showTarget[1]} />
      );
    }

    return null;
  };

  return (
    <div className="game">
      Game
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
        <div
          className="TEST-ONLY-FAKEPOSITION"
          style={
          {
            position: 'absolute',
            left: '250px',
            top: '300px',
            width: '6px',
            aspectRatio: 1,
            border: '3px solid red',
            animation: 'glow-test 5s ease-in-out 0s infinite',
          }
        }
        />
        <div
          className="TEST-ONLY-FAKEPOSITION"
          style={
          {
            position: 'absolute',
            left: '50px',
            top: '75px',
            width: '6px',
            aspectRatio: 1,
            border: '3px solid red',
            animation: 'glow-test 5s ease-in-out 0s infinite',
          }
        }
        />
      </div>

    </div>
  );
}

export { Game, transformDbData };
