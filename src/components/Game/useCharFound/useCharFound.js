import React, { useState } from 'react';

const useCharFound = () => {
  const [charFound, setCharFound] = useState([false, false]);

  const checkClickPosition = (clickPositon, charPositon, e) => {
    // If clickPosition is close to one of the charPosition
    // corresponding charFound state switch to true

    const clickX = clickPositon[0];
    const clickY = clickPositon[1];
    const waldoPosition = charPositon[0].waldo;
    const odlawPosition = charPositon[0].odlaw;
    const target = e.target.textContent;

    if (target === 'Waldo') {
    // Check if click position is on / close to Waldo position
      if ((((waldoPosition[0] - 10) < clickX) && (clickX < (waldoPosition[0] + 10)))
    && (((waldoPosition[1] - 10) < clickY) && (clickY < (waldoPosition[1] + 10)))) {
        const copyCharFound = [...charFound];
        copyCharFound[0] = true;
        setCharFound(copyCharFound);
      }
    }

    if (target === 'Odlaw') {
    // Check if click position is on / close to Odlaw position
      if ((((odlawPosition[0] - 10) < clickX) && (clickX < (odlawPosition[0] + 10)))
    && (((odlawPosition[1] - 10) < clickY) && (clickY < (odlawPosition[1] + 10)))) {
        const copyCharFound = [...charFound];
        copyCharFound[1] = true;
        setCharFound(copyCharFound);
      }
    }
  };

  return { charFound, checkClickPosition };
};

export default useCharFound;
