// Tipagem para styled-components (assegure que "types": ["vite/client"] ou similar existe no tsconfig)
import 'styled-components';
import { Theme } from '@/styles/theme';

declare module 'styled-components' {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    export interface DefaultTheme extends Theme {}
}
