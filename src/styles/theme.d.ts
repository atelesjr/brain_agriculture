export declare const theme: {
    readonly colors: {
        readonly primary: "#00793cff";
        readonly primaryHover: "rgba(0, 121, 61, 0.1)";
        readonly secondary: "#a19700ff";
        readonly secondaryHover: "#aaa4565b";
        readonly ghost: "transparent";
        readonly textOnPrimary: "#FFFFFF";
        readonly text: "#0F172A";
        readonly textSecondary: "#353535ff";
        readonly disabledBg: "#E6EDF8";
        readonly disabledText: "#9CA3AF";
        readonly background_main: "#dadada";
        readonly surface: "rgba(0, 94, 47, 0.27)";
        readonly surfaceAlt: "#ffffff";
        readonly muted: "#a7a7a7ff";
        readonly alert: "#ca281fff";
    };
    readonly spacing: {
        readonly sm: "8px";
        readonly md: "12px";
        readonly lg: "16px";
    };
    readonly radius: {
        readonly sm: "6px";
        readonly md: "8px";
        readonly round: "9999px";
    };
    readonly fontSize: {
        readonly sm: "0.875rem";
        readonly md: "1rem";
        readonly lg: "1.125rem";
    };
    readonly breakpoints: {
        readonly mobile: "320px";
        readonly tablet: "768px";
        readonly desktop: "1024px";
        readonly wide: "1440px";
    };
    readonly media: {
        readonly mobile: "@media (min-width: 320px)";
        readonly tablet: "@media (min-width: 768px)";
        readonly desktop: "@media (min-width: 1024px)";
        readonly wide: "@media (min-width: 1440px)";
        readonly maxMobile: "@media (max-width: 768px)";
        readonly maxTablet: "@media (max-width: 1024px)";
        readonly maxDesktop: "@media (max-width: 1440px)";
    };
};
export type Theme = typeof theme;
