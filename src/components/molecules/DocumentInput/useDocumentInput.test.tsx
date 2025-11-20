import { render } from '@/test-utils';
import { act } from '@testing-library/react';
import { vi } from 'vitest';
import { useDocumentInput } from './useDocumentInput';

function HookHost({ raw, capture }: { raw?: string; capture: React.MutableRefObject<any> }) {
  const hook = useDocumentInput(raw);
  capture.current = hook;
  return null;
}

describe('useDocumentInput', () => {
  it('formats CPF and detects type', async () => {
    const capture: React.MutableRefObject<any> = { current: null };
    render(<HookHost raw={'52998224725'} capture={capture} />);
    // render is synchronous here; capture should be set immediately
    expect(capture.current).not.toBeNull();
    const hook = capture.current;
    expect(hook.format('52998224725')).toBe('529.982.247-25');
    expect(hook.detectType('52998224725')).toBe('cpf');
  });

  it('formats CNPJ and detects type', async () => {
    const capture: React.MutableRefObject<any> = { current: null };
    render(<HookHost raw={'11444777000161'} capture={capture} />);
    expect(capture.current).not.toBeNull();
    const hook = capture.current;
    expect(hook.format('11444777000161')).toBe('11.444.777/0001-61');
    expect(hook.detectType('11444777000161')).toBe('cnpj');
  });

  it('validation rules accept valid and reject invalid', async () => {
    const capture: React.MutableRefObject<any> = { current: null };
    render(<HookHost capture={capture} />);
    expect(capture.current).not.toBeNull();
    const hook = capture.current;
    // valid CPF
    expect(hook.rules.validate('52998224725')).toBe(true);
    // invalid CPF (wrong digits)
    const invalid = hook.rules.validate('11111111111');
    expect(typeof invalid).toBe('string');
  });

  it('handleChange strips non-digits and limits length', async () => {
    const capture: React.MutableRefObject<any> = { current: null };
    render(<HookHost capture={capture} />);
    expect(capture.current).not.toBeNull();

    const hook = capture.current;
    const mock = vi.fn();
    act(() => hook.handleChange('529.982.247-25123456', mock));
    // should call with digits only and limited to 14 chars
    expect(mock).toHaveBeenCalledWith('52998224725123');
  });
});

export {};
