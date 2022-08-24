import React from 'react';
import {
  render, screen, waitFor, act,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { Game, transformDbData } from './Game';

const mockFirebaseModule = require('../../firebase/firebase');

// Mock the DB datas
const mockLadderDbData = [{ mockUser1: 60, mockUser2: 55 }];
const mockLadderDbData2 = [{ mockUser1: 60, mockUser2: 55, mockUser3: 70 }];
const mockTargetDbData = [{ odlaw: [250, 300], waldo: [50, 75] }];

describe('Game component tests', () => {
  it('transformDbData: Sould return an sorted array', () => {
    let sortedDbData = transformDbData(mockLadderDbData);
    expect(sortedDbData).toMatchObject([['mockUser2', 55], ['mockUser1', 60]]);

    sortedDbData = transformDbData(mockLadderDbData2);
    expect(sortedDbData).toMatchObject([
      ['mockUser2', 55],
      ['mockUser1', 60],
      ['mockUser3', 70]]);
  });

  it('Fetch TargetPosition: Game image render if data are OK', async () => {
    // Mock the DB Call
    jest.spyOn(mockFirebaseModule, 'getTargetPosition').mockReturnValue(mockTargetDbData);

    const { container } = render(<Game />);

    // await waitFor(() => container.querySelector('.game-image'));
    await waitFor(() => screen.getByAltText('where is waldo'));
    const gameImage = screen.getByAltText('where is waldo');

    expect(gameImage).toBeInTheDocument();
  });

  it('Fetch TargetPosition: Error message render if data are NOT OK', async () => {
    // Mock the DB Call
    jest.spyOn(mockFirebaseModule, 'getTargetPosition').mockReturnValue('error');

    const { container } = render(<Game />);

    // await waitFor(() => container.querySelector('.game-image'));
    await waitFor(() => screen.getByText('Error loading game data, please reload the page'));
    const errorMessage = screen.getByText('Error loading game data, please reload the page');

    expect(errorMessage).toBeInTheDocument();
  });

  it('When user click on the image, GameTarget is rendered', async () => {
    // Mock the DB Call
    jest.spyOn(mockFirebaseModule, 'getTargetPosition').mockReturnValue(mockTargetDbData);

    const { container } = render(<Game />);

    // await waitFor(() => container.querySelector('.game-image'));
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
