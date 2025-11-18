import { render, waitFor } from '@/test-utils';
import { act } from '@testing-library/react';
import { useProducerForm } from './useProducerForm';

function HookHost({ initial, capture }: { initial?: any; capture: React.MutableRefObject<any> }) {
  const hook = useProducerForm(initial);
  capture.current = hook;
  return null;
}

describe('useProducerForm', () => {
  it('initializes with empty values and canAddProperty false', async () => {
    const capture: React.MutableRefObject<any> = { current: null };
    render(<HookHost capture={capture} />);

    await waitFor(() => expect(capture.current).not.toBeNull());

    const hook = capture.current;
    const values = hook.form.getValues();
    expect(values.name).toBe('');
    expect(values.document).toBe('');
    expect(hook.canAddProperty).toBe(false);
  });

  it('infers document type correctly', async () => {
    const capture: React.MutableRefObject<any> = { current: null };
    render(<HookHost capture={capture} />);
    await waitFor(() => expect(capture.current).not.toBeNull());

    const hook = capture.current;
    // valid CPF example
    expect(hook.inferDocumentType('52998224725')).toBe('CPF');
    // valid CNPJ example
    expect(hook.inferDocumentType('11444777000161')).toBe('CNPJ');
    // unknown/short
    expect(hook.inferDocumentType('123')).toBe('');
  });

  it('canAddProperty becomes true only when form is valid (name + valid document)', async () => {
    const capture: React.MutableRefObject<any> = { current: null };
    render(<HookHost capture={capture} />);
    await waitFor(() => expect(capture.current).not.toBeNull());

    // initial false
    expect(capture.current.canAddProperty).toBe(false);

    // set name only
    act(() => capture.current.form.setValue('name', 'New Producer', { shouldValidate: true }));
    await waitFor(() => expect(capture.current.form.getValues().name).toBe('New Producer'));
    expect(capture.current.canAddProperty).toBe(false);

    // set a valid CPF (digits only) and validate
    const validCPF = '52998224725';
    act(() => capture.current.form.setValue('document', validCPF, { shouldValidate: true }));
    await waitFor(() => expect(capture.current.form.getValues().document).toBe(validCPF));

    // now form should be valid and canAddProperty true
    await waitFor(() => expect(capture.current.canAddProperty).toBe(true));
  });
});

export {};
