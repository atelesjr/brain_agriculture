import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { ProducerFormValues } from '../ProducerForm';
interface FarmsFormProps {
    register: UseFormRegister<ProducerFormValues>;
    errors: FieldErrors<ProducerFormValues>;
}
declare const FarmsForm: ({ register, errors }: FarmsFormProps) => import("react/jsx-runtime").JSX.Element;
export default FarmsForm;
