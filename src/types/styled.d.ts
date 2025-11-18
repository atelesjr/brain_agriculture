/* eslint-disable @typescript-eslint/consistent-type-definitions */
import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            primary: string;
            primaryHover: string;
            secondary: string;
            secondaryHover: string;
            ghost: string;
            textOnPrimary: string;
            text: string;
            textSecondary: string;
            disabledBg: string;
            disabledText: string;
            background_main: string;
            surface: string;
            surfaceAlt: string;
            muted: string;
            alert: string;
            [key: string]: string;
        };
        spacing: { sm: string; md: string; lg: string; [key: string]: string };
        radius: { sm: string; md: string; round: string; [key: string]: string };
        fontSize: { sm: string; md: string; lg: string; [key: string]: string };
        // avoid `any` — use explicit record types
        breakpoints: Record<string, string>;
        media: Record<string, string>;
    }
}
