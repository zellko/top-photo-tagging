import React from 'react';
import {
  render, screen,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import GameTarget from './GameTarget';

describe('Game target component tests', () => {
  it('Waldo / Odlaw button and Target div are rendered', () => {
    const { container } = render(<GameTarget
      position={[0, 0]}
      onGameTargetButtonClick={(e) => { }}
      charactersFound={[false, false]}
    />);

    const waldoButton = screen.getByRole('button', { name: 'Waldo' });
    const odlawButton = screen.getByRole('button', { name: 'Odlaw' });
    const targetDiv = container.querySelector('.target');
    expect(waldoButton).toBeInTheDocument();
    expect(odlawButton).toBeInTheDocument();
    expect(targetDiv).toBeInTheDocument();
  });

  it('Button "Waldo", class "found" is added if props is true', async () => {
    const { container, rerender } = render(<GameTarget
      position={[0, 0]}
      onGameTargetButtonClick={() => { }}
      charactersFound={[false, false]}
    />);

    const waldoButton = screen.getByRole('button', { name: 'Waldo' });

    rerender(<GameTarget
      position={[0, 0]}
      onGameTargetButtonClick={() => { }}
      charactersFound={[true, false]}
    />);

    expect(waldoButton.className).toBe('found');
  });

  it('Button "Odlaw", class "found" is added if props is true', async () => {
    const { container, rerender } = render(<GameTarget
      position={[0, 0]}
      onGameTargetButtonClick={() => { }}
      charactersFound={[false, false]}
    />);

    const odlawButton = screen.getByRole('button', { name: 'Odlaw' });

    rerender(<GameTarget
      position={[0, 0]}
      onGameTargetButtonClick={() => { }}
      charactersFound={[false, true]}
    />);

    expect(odlawButton.className).toBe('found');
  });

  it('Button "Odlaw" and "Waldo" are calling props function', async () => {
    const mockFunction = jest.fn();

    render(<GameTarget
      position={[0, 0]}
      onGameTargetButtonClick={mockFunction}
      charactersFound={[false, false]}
    />);

    const odlawButton = screen.getByRole('button', { name: 'Odlaw' });
    const waldoButton = screen.getByRole('button', { name: 'Waldo' });

    userEvent.click(odlawButton);
    userEvent.click(waldoButton);
    expect(mockFunction).toHaveBeenCalledTimes(2);
  });
});
