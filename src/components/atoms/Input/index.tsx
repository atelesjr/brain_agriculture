import React from 'react';
import { InputWrapper, Label, RequiredStar, StyledInput, ErrorText } from './Input.styles';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  required?: boolean;
  error?: string | null;
  // allow passing a custom input element as child
  children?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ label, required, error, children, ...inputProps }, ref) => {
  const hasError = Boolean(error);

  return (
    <InputWrapper>
      {label && (
        <Label>
          {label}
          {required && <RequiredStar>*</RequiredStar>}
        </Label>
      )}

      {children ? (
        <>{children}</>
      ) : (
        <StyledInput ref={ref} {...(inputProps as React.InputHTMLAttributes<HTMLInputElement>)} $hasError={hasError} />
      )}

      {error ? <ErrorText>{error}</ErrorText> : null}
    </InputWrapper>
  );
});

Input.displayName = 'Input';

export default Input;
