import { describe, it, expect } from 'vitest';
import {
  onlyDigits,
  formatDocument,
  isValidCPF,
  isValidCNPJ,
} from './validations';

describe('Document validations', () => {
  it('onlyDigits removes non-digit characters', () => {
    expect(onlyDigits('a1b2-3.4')).toBe('1234');
    expect(onlyDigits('')).toBe('');
  });

  it('formatDocument formats CPF and CNPJ correctly', () => {
    expect(formatDocument('52998224725')).toBe('529.982.247-25');
    expect(formatDocument('11444777000161')).toBe('11.444.777/0001-61');
    expect(formatDocument('')).toBe('');
  });

  it('isValidCPF accepts valid CPF and rejects invalid ones', () => {
    // valid CPF
    expect(isValidCPF('52998224725')).toBe(true);
    // invalid lengths / repeated digits
    expect(isValidCPF('11111111111')).toBe(false);
    expect(isValidCPF('123')).toBe(false);
    expect(isValidCPF('52998224724')).toBe(false); // wrong check digit
  });

  it('isValidCNPJ accepts valid CNPJ and rejects invalid ones', () => {
    // valid CNPJ
    expect(isValidCNPJ('11444777000161')).toBe(true);
    // invalid repeated
    expect(isValidCNPJ('11111111111111')).toBe(false);
    expect(isValidCNPJ('123')).toBe(false);
    expect(isValidCNPJ('11444777000162')).toBe(false); // wrong check digit
  });
});
