import '@testing-library/jest-dom';
import { transformDbData, checkPlayerLadderPosition } from './GameEnd';

// Mock the DB datas
const mockLadderDbData = [
  {
    array: ['mock1', 6, 654],
  },
  {
    array: ['mock2', 10, 456],
  },
];

const mockLadderDbData2 = [
  {
    array: ['mock1', 6, 654],
  },
  {
    array: ['mock2', 10, 456],
  },
  {
    array: ['mock3', 3, 457],
  },
];

describe('GameEnd functions tests', () => {
  it('transformDbData: Should return an sorted array', () => {
    let sortedDbData = transformDbData(mockLadderDbData);
    expect(sortedDbData).toMatchObject([
      ['mock1', 6, 654],
      ['mock2', 10, 456],
    ]);

    sortedDbData = transformDbData(mockLadderDbData2);
    expect(sortedDbData).toMatchObject([
      ['mock3', 3, 457],
      ['mock1', 6, 654],
      ['mock2', 10, 456],
    ]);
  });

  it('checkPlayerLadderPosition: Should return player position in the ladder', () => {
    const mockSortedLadderData = [
      ['mock3', 3, 457],
      ['mock1', 6, 654],
      ['mock2', 10, 456],
    ];

    const position = checkPlayerLadderPosition(7, mockSortedLadderData);

    expect(position).toBe(3);
  });
});

/*
    // Mock the DB Call
    const mockFirebaseModule = require('../../../firebase/firebase');
    jest.spyOn(mockFirebaseModule, 'getTargetPosition').mockReturnValue(mockTargetDbData);
*/
