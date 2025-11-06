import { createContext, useContext, useMemo, useState, ReactNode } from 'react';

type Mode = 'demo' | 'production';

interface ModeContextValue {
  mode: Mode;
  setMode: (mode: Mode) => void;
}

const ModeContext = createContext<ModeContextValue | undefined>(undefined);

function detectMode(): Mode {
  if (typeof window === 'undefined') {
    return process.env.NEXT_PUBLIC_APP_MODE === 'production' ? 'production' : 'demo';
  }

  return (localStorage.getItem('securyhub_mode') as Mode) ||
    (process.env.NEXT_PUBLIC_APP_MODE === 'production' ? 'production' : 'demo');
}

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<Mode>(detectMode);

  const setMode = (next: Mode) => {
    setModeState(next);
    if (typeof window !== 'undefined') {
      localStorage.setItem('securyhub_mode', next);
    }
  };

  const value = useMemo(() => ({ mode, setMode }), [mode]);

  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
}

export function useMode() {
  const ctx = useContext(ModeContext);
  if (!ctx) {
    throw new Error('useMode must be used within ModeProvider');
  }
  return ctx;
}
