import styled from 'styled-components';

export const InputWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 6px;
`;

export const Label = styled.label`
	font-size: 13px;
	color: ${({ theme }) => theme.colors.textSecondary};
	font-weight: 600;
	display: flex;
	align-items: center;
	gap: 6px;
`;

export const RequiredStar = styled.span`
	color: ${({ theme }) => theme.colors.alert};
`;

export const StyledInput = styled.input<{ $hasError?: boolean }>`
	width: 100%;
	box-sizing: border-box;
	padding: 4px 12px;
	border-radius: ${({ theme }) => theme.radius.md};
	border: 2px solid
		${({ $hasError, theme }) =>
			$hasError ? theme.colors.alert : theme.colors.muted};
	font-size: 14px;
	transition: border-color 120ms ease-out, box-shadow 120ms ease-out;

	/* show a colored outline while keeping subtle default border when no error */
	box-shadow: ${({ $hasError, theme }) =>
		$hasError ? `0 0 0 3px ${theme.colors.alert}22` : 'none'};

	&:focus,
	&:hover {
		outline: none;
		border-color: ${({ $hasError, theme }) =>
			$hasError ? theme.colors.alert : theme.colors.primary};
		box-shadow: ${({ $hasError, theme }) =>
			$hasError
				? `0 0 0 4px ${theme.colors.alert}22`
				: `0 0 0 4px ${theme.colors.primary}14`};
	}
`;

export const ErrorText = styled.span`
	font-size: 10px;
	font-weight: 600;
	color: ${({ theme }) => theme.colors.alert};
`;
