import { useCallback, useState } from 'react';

export default function useFormList() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [resetCounters, setResetCounters] = useState<Record<string, number>>({});

  const toggle = useCallback((farmId: string) => {
    setOpenId((prev) => {
      const next = prev === farmId ? null : farmId;
      if (prev === farmId && next === null) {
        // closing the same item -> bump its reset counter
        setResetCounters((m) => ({ ...m, [farmId]: (m[farmId] ?? 0) + 1 }));
      }
      return next;
    });
  }, []);

  return { openId, resetCounters, toggle } as const;
}
