import type { ReactElement } from 'react';
import { type RenderOptions } from '@testing-library/react';
declare function customRender(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>): import("@testing-library/react").RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
export * from '@testing-library/react';
export { customRender as render };
