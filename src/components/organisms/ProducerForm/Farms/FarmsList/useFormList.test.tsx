import { render, waitFor } from '@/test-utils';
import { act } from '@testing-library/react';
import useFormList from './useFormList';

function HookHost({
  capture,
}: {
  capture: React.MutableRefObject<ReturnType<typeof useFormList> | null>;
}) {
  const hook = useFormList();
  capture.current = hook;
  return null;
}

describe('useFormList', () => {
  it('initializes closed and toggles open/close with reset counter', async () => {
    const capture: React.MutableRefObject<ReturnType<typeof useFormList> | null> = { current: null };
    render(<HookHost capture={capture} />);

    await waitFor(() => expect(capture.current).not.toBeNull());
    const h = capture.current!;

    // initial state
    expect(h.openId).toBeNull();
    expect(h.resetCounters).toEqual({});

    // open id 'a'
    act(() => h.toggle('a'));
    expect(capture.current?.openId).toBe('a');
    expect(capture.current?.resetCounters['a']).toBeUndefined();

    // close same id -> resets counter incremented
    act(() => h.toggle('a'));
    expect(capture.current?.openId).toBeNull();
    expect(capture.current?.resetCounters['a']).toBe(1);

    // open again (should not change counter)
    act(() => h.toggle('a'));
    expect(capture.current?.openId).toBe('a');
    expect(capture.current?.resetCounters['a']).toBe(1);

    // toggle to different id 'b'
    act(() => h.toggle('b'));
    expect(capture.current?.openId).toBe('b');
    // counters for a remain
    expect(capture.current?.resetCounters['a']).toBe(1);
  });
});

export {};
