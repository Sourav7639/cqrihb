import { useMode } from '../store/modeStore';

export function DemoBadge() {
  const { mode } = useMode();

  if (mode !== 'demo') return null;

  return <div className="demo-badge">Demo mode active</div>;
}
