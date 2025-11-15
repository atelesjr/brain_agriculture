import type { Farm } from '@/types/producer';
interface FarmsProps {
    farms?: Farm[];
    resetCounter?: number;
}
declare const Farms: ({ farms, resetCounter }: FarmsProps) => import("react/jsx-runtime").JSX.Element;
export default Farms;
