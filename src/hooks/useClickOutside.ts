import { useEffect } from 'react';

/**
 * Hook: useClickOutside
 * - Calls `onOutside` when a click occurs outside the given ref element.
 * - `ref` can be a HTMLElement or null (usage with useRef.current).
 */
export default function useClickOutside(
  ref: React.RefObject<HTMLElement | null>,
  onOutside: (e: MouseEvent) => void
) {
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (!ref.current) return;
      if (e.target instanceof Node && !ref.current.contains(e.target)) {
        onOutside(e);
      }
    }

    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [ref, onOutside]);
}
