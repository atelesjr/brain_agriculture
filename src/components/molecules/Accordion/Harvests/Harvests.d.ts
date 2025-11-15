import type { Safra } from '@/types/producer';
import type { Farm } from '@/types/producer';
interface HarvestProps {
    farm: Farm & {
        safras: Safra[];
    };
    resetCounter?: number;
}
declare const Harvest: ({ farm, resetCounter }: HarvestProps) => import("react/jsx-runtime").JSX.Element;
export default Harvest;
