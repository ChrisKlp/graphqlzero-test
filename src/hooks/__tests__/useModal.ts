import { renderHook, act } from '@testing-library/react-hooks';
import useModal from '../useModal';

describe('useModal hook', () => {
  it('allows you to show and close modal', () => {
    const { result } = renderHook(() => useModal());

    expect(result.current.isVisible).toBe(false);

    act(() => {
      result.current.showModal();
    });

    expect(result.current.isVisible).toBe(true);

    act(() => {
      result.current.closeModal();
    });

    expect(result.current.isVisible).toBe(false);
  });
});
