import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import {
  render, screen, waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Game from './Game';

const mockFirebaseModule = require('../../firebase/firebase');

// Mock the DB datas
const mockTargetDbData = [{ odlaw: [250, 300], waldo: [50, 75] }];

describe('Game component tests', () => {
  it('Fetch TargetPosition: Game image render if data are OK', async () => {
    // Mock the DB Call
    jest.spyOn(mockFirebaseModule, 'getTargetPosition').mockReturnValue(mockTargetDbData);

    const { container } = render(
      <BrowserRouter>
        <Game />
      </BrowserRouter>,
    );

    // await waitFor(() => container.querySelector('.game-image'));
    await waitFor(() => screen.getByAltText('where is waldo'));
    const gameImage = screen.getByAltText('where is waldo');

    expect(gameImage).toBeInTheDocument();
  });

  it('Fetch TargetPosition: Error message render if data are NOT OK', async () => {
    // Mock the DB Call
    jest.spyOn(mockFirebaseModule, 'getTargetPosition').mockReturnValue('error');

    const { container } = render(
      <BrowserRouter>
        <Game />
      </BrowserRouter>,
    );

    // await waitFor(() => container.querySelector('.game-image'));
    await waitFor(() => screen.getByText('Error loading game data, please reload the page'));
    const errorMessage = screen.getByText('Error loading game data, please reload the page');

    expect(errorMessage).toBeInTheDocument();
  });

  it('When user click on the image, GameTarget is rendered', async () => {
    // Mock the DB Call
    jest.spyOn(mockFirebaseModule, 'getTargetPosition').mockReturnValue(mockTargetDbData);

    const { container } = render(
      <BrowserRouter>
        <Game />
      </BrowserRouter>,
    );

    await waitFor(() => screen.getByAltText('where is waldo'));
    const gameImage = screen.getByAltText('where is waldo');

    userEvent.click(gameImage);

    const gameTarget = container.querySelector('.game-target');

    expect(gameTarget).toBeInTheDocument();
  });
});

// Mock the DB Call
// jest.mock('../../firebase/firebase', () => {
//   const actualModule = jest.requireActual('../../firebase/firebase');

//   return new Proxy(actualModule, {
//     get: (target, property) => {
//       switch (property) {
//         // add cases for exports you want to mock
//         // 👇👇👇
//         case 'getTargetPosition': {
//           return jest.fn()
//             .mockReturnValueOnce(mockTargetDbData)
//             .mockReturnValueOnce('error');
//         }
//         // fallback to the original module
//         default: {
//           return target[property];
//         }
//       }
//     },
//   });
// });
