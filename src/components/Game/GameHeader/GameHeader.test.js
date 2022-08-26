import React from 'react';
import {
  render, screen,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import GameHeader from './GameHeader';

describe('Game header component tests', () => {
  it('Waldo portrait are rendered', async () => {
    render(<GameHeader charactersFound={[false, false]} />);

    const waldoPortrait = await screen.findByAltText('Waldo portrait');
    const odlawPortrait = await screen.findByAltText('Odlaw portrait');
    expect(waldoPortrait).toBeInTheDocument();
    expect(odlawPortrait).toBeInTheDocument();

    // const waldoPortrait = rerender.querySelector('.found');
    // expect(waldoPortrait.classList).toBe('found');
  });

  it('Waldo portrait class "found" is added if props is true', async () => {
    const { container, rerender } = render(<GameHeader charactersFound={[false, false]} />);

    const waldoPortrait = await screen.findByAltText('Waldo portrait');

    rerender(<GameHeader charactersFound={[true, false]} />);

    expect(waldoPortrait.classList[1]).toBe('found');
  });

  it('Odlaw portrait class "found" is added if props is true', async () => {
    const { container, rerender } = render(<GameHeader charactersFound={[false, false]} />);

    const odlawPortrait = await screen.findByAltText('Odlaw portrait');

    rerender(<GameHeader charactersFound={[false, true]} />);

    expect(odlawPortrait.classList[1]).toBe('found');
  });
});
