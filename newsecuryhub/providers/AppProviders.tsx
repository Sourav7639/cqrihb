import { ReactNode, useEffect } from 'react';
import { DemoStoreProvider } from '../store/demoStore';
import { ModeProvider, useMode } from '../store/modeStore';
import { SupabaseProvider } from '../store/supabaseStore';

function Providers({ children }: { children: ReactNode }) {
  const { mode } = useMode();

  useEffect(() => {
    document.documentElement.dataset.mode = mode;
  }, [mode]);

  if (mode === 'production') {
    return <SupabaseProvider>{children}</SupabaseProvider>;
  }

  return <DemoStoreProvider>{children}</DemoStoreProvider>;
}

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ModeProvider>
      <Providers>{children}</Providers>
    </ModeProvider>
  );
}
