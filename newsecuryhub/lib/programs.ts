import useSWR from 'swr';
import { useMode } from '../store/modeStore';
import { useDemoStore } from '../store/demoStore';
import { Program } from '../types';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function usePrograms() {
  const { mode } = useMode();

  if (mode === 'production') {
    const base = process.env.NEXT_PUBLIC_API_BASE || '/.netlify/functions';
    const { data, error } = useSWR<Program[]>(`${base}/programs`, fetcher);
    return {
      programs: data || [],
      isLoading: !data && !error,
      isError: Boolean(error)
    };
  }

  const { programs } = useDemoStore();
  return {
    programs,
    isLoading: false,
    isError: false
  };
}
