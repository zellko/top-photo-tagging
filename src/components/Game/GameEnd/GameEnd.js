import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getLadder, addPlayerToLadder, updatePlayerLadder } from '../../../firebase/firebase';
import './GameEnd.css';

function transformDbData(dbData) {
  // This function convert ladder data's to an array...
  const dbDataArray = [];

  for (let index = 0; index < dbData.length; index++) {
    const element = dbData[index];

    const id = Object.keys(element);

    dbDataArray.push(element[id]);
  }

  // ...And sort the array
  dbDataArray.sort((a, b) => a[1] - b[1]);

  return dbDataArray;
}

function convertTime(timeSecond) {
  const minute = Math.floor(timeSecond / 60);
  const second = timeSecond % 60;

  return `${minute}m${second}s`;
}

function checkPlayerLadderPosition(userTime, LadderData) {
  // This function return the position of user in the ladder
  let userPositon;

  for (let index = 0; index < LadderData.length; index++) {
    const element = LadderData[index];

    if (element[1] >= userTime) {
      userPositon = index + 1;
      return userPositon;
    }
  }

  userPositon = LadderData.length + 1;

  return userPositon;
}

function GameEnd() {
  const params = useLocation();
  const timer = params.state;
  const sesionKey = params.key;
  const [ladder, setLadder] = useState([]);
  const [playerLadderPosition, setplayerLadderPosition] = useState(undefined);
  const [inputPlaceHolder, setInputPlaceHolder] = useState('Anonymous Player');

  useEffect(() => {
    let ignore = false;
    // const randomId = Math.floor(Date.now() * Math.random()); // Generate a random ID

    async function pushPlayerTimeToLadder() {
      // Push player time to Ladder Database
      const playerData = { array: ['AnonPlayer', timer, sesionKey] };
      await addPlayerToLadder(sesionKey, playerData);
    }

    async function fetchLadder() {
      // Fetch Ladder Datas
      const ladderData = await getLadder();

      // Convert Data to array and sort them
      const sortedLadder = transformDbData(ladderData);

      // Get player position based on his time
      const playerPosition = checkPlayerLadderPosition(timer, sortedLadder);

      if (!ignore && (sortedLadder.length > 0)) {
        if (timer > 0) {
          // Add player data's to ladder hook
          sortedLadder.splice(playerPosition - 1, 0, ['AnonPlayer', timer, sesionKey]);

          setplayerLadderPosition(playerPosition);
          pushPlayerTimeToLadder();
        }

        setLadder(sortedLadder);
      }
    }

    fetchLadder();

    return () => {
      ignore = true;
    };
  }, []);

  const updateScore = () => {
    const input = document.querySelector('input');
    const playerName = input.value;

    // Ignore if input is empty or if the name was not modified
    if (playerName === '' || playerName === ladder[playerLadderPosition - 1][0]) return;

    // Update DB
    const playerData = { array: [playerName, timer, sesionKey] };
    updatePlayerLadder(sesionKey, playerData);

    // Update Hook
    const copyLadder = [...ladder];
    copyLadder[playerLadderPosition - 1][0] = playerName;
    setLadder(copyLadder);
    setInputPlaceHolder(playerName);
  };

  const showGameResult = () => {
    if (timer > 0) {
      return (
        <div className="game-result">
          <p>Congratulation! You found them all!</p>
          <p className="game-result-score">
            Your time:
            {' '}
            {convertTime(timer)}
          </p>
          <div className="game-result-input">
            <label htmlFor="playername">Enter your name:</label>
            <input type="text" id="playername" name="playername" placeholder={inputPlaceHolder} />
            <button type="button" onClick={updateScore}>Save Score</button>
          </div>
        </div>
      );
    }
  };

  const showError = () => {
    if (ladder === undefined || ladder === 'error') {
      return (
        <p>Error loading game data, please reload the page</p>
      );
    }
  };

  return (
    <div className="game-end">
      {showGameResult()}
      <div className="game-ladder">
        <h2>LeaderBoard</h2>
        {ladder.map((element, index) => {
          if (index > 9) return;

          if (index > 8 && playerLadderPosition > 8) {
            return (
              <div className="ladder-row-out" key={15645987}>
                <div className="splitter" />
                <div className="ladder-row-out-result">
                  <p>
                    {playerLadderPosition}
                    .
                  </p>
                  <p>
                    {ladder[playerLadderPosition - 1][0]}
                  </p>
                  <p>
                    {convertTime(timer)}
                  </p>
                </div>
              </div>
            );
          }

          if (index === playerLadderPosition - 1) {
            return (
              <div className="ladder-row player-position" key={element[2]}>
                <p>
                  {index + 1}
                  .
                </p>
                <p>
                  {element[0]}
                </p>
                <p>
                  {convertTime(element[1])}
                </p>
              </div>
            );
          }
          return (
            <div className="ladder-row" key={element[2]}>
              <p>
                {index + 1}
                .
              </p>
              <p>
                {element[0]}
              </p>
              <p>
                {convertTime(element[1])}
              </p>
            </div>
          );
        })}
        {showError()}
      </div>
    </div>
  );
}

export { GameEnd, transformDbData, checkPlayerLadderPosition };
