import 'styled-components';
import { Theme } from '../styles/theme';

declare module 'styled-components' {
  // mapear DefaultTheme para o Theme do projeto
  export interface DefaultTheme extends Theme {}
}
