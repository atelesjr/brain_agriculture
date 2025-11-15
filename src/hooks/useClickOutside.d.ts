/**
 * Hook: useClickOutside
 * - Calls `onOutside` when a click occurs outside the given ref element.
 * - `ref` can be a HTMLElement or null (usage with useRef.current).
 */
export default function useClickOutside(ref: React.RefObject<HTMLElement | null>, onOutside: (e: MouseEvent) => void): void;
