import type { Control, FieldValues, FieldPath } from 'react-hook-form';
type DocumentInputProps<TFieldValues extends FieldValues = {
    documento?: string;
}, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> = {
    control: Control<TFieldValues>;
    name: TName;
};
declare const DocumentInput: <TFieldValues extends FieldValues = {
    documento?: string;
}, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({ control, name, }: DocumentInputProps<TFieldValues, TName>) => import("react/jsx-runtime").JSX.Element;
export default DocumentInput;
