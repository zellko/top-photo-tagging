import {
  renderHook, act,
} from '@testing-library/react';
import useCharFound from './useCharFound';

// Mock Target Position data and Button click event Data
const mockTargetDbData = [{ odlaw: [250, 300], waldo: [50, 75] }];
const mockEventWaldoBtn = { target: { textContent: 'Waldo' } };
const mockEventOdlawBtn = { target: { textContent: 'Odlaw' } };

describe('useCharFound Hook tests', () => {
  it(`checkClickPosition: If click position match one of the target position,
  corresponding state should change to true - A`, () => {
    const { result } = renderHook(() => useCharFound());

    act(() => {
      result.current.checkClickPosition([50, 75], mockTargetDbData, mockEventWaldoBtn);
    });

    expect(result.current.charFound).toStrictEqual([true, false]);
  });

  it(`checkClickPosition: If click position match one of the target position,
  corresponding state should change to true - B`, () => {
    const { result } = renderHook(() => useCharFound());

    act(() => {
      result.current.checkClickPosition([50, 75], mockTargetDbData, mockEventWaldoBtn);
    });

    act(() => {
      result.current.checkClickPosition([259, 291], mockTargetDbData, mockEventOdlawBtn);
    });

    expect(result.current.charFound).toStrictEqual([true, true]);
  });

  it(`checkClickPosition: If click position do not match one of the target position,
  corresponding state should not change `, () => {
    const { result } = renderHook(() => useCharFound());

    act(() => {
      result.current.checkClickPosition([50, 86], mockTargetDbData, mockEventOdlawBtn);
    });

    expect(result.current.charFound).toStrictEqual([false, false]);
  });
});
