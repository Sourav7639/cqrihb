import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Session, SupabaseClient } from '@supabase/supabase-js';

interface SupabaseContextValue {
  supabase: SupabaseClient | null;
  session: Session | null;
}

const SupabaseContext = createContext<SupabaseContextValue | undefined>(undefined);

export function SupabaseProvider({ children }: { children: ReactNode }) {
  const [supabase] = useState(() =>
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      ? createBrowserSupabaseClient({
          supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
          supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        })
      : null
  );
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const value = useMemo(() => ({ supabase, session }), [supabase, session]);

  return <SupabaseContext.Provider value={value}>{children}</SupabaseContext.Provider>;
}

export function useSupabase() {
  const ctx = useContext(SupabaseContext);
  if (!ctx) {
    throw new Error('useSupabase must be used within SupabaseProvider');
  }
  return ctx;
}
