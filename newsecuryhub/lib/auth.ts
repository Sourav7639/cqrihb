import { useMode } from '../store/modeStore';
import { useDemoStore } from '../store/demoStore';
import { useSupabase } from '../store/supabaseStore';

export function useAuth() {
  const { mode } = useMode();

  if (mode === 'production') {
    return useSupabase();
  }

  const { auth, login, signup, logout } = useDemoStore();
  return {
    session: auth.user ? { user: auth.user } : null,
    supabase: null,
    login,
    signup,
    logout,
    user: auth.user
  };
}
