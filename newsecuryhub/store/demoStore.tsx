import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { nanoid } from 'nanoid/non-secure';
import {
  DemoDatabase,
  Program,
  Role,
  Submission,
  SubmissionStatus,
  User
} from '../types';
import { demoSeed } from '../data/demoSeed';

interface AuthState {
  user: User | null;
}

interface DemoStoreContextValue {
  auth: AuthState;
  login: (email: string, password: string) => Promise<void>;
  signup: (payload: { email: string; name: string; role: Role; password: string }) => Promise<void>;
  logout: () => void;
  programs: Program[];
  submissions: Submission[];
  createProgram: (payload: Omit<Program, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Program>;
  submitReport: (
    payload: Omit<Submission, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'reward'>
  ) => Promise<Submission>;
  updateSubmissionStatus: (id: string, status: SubmissionStatus, reward?: number | null) => Promise<void>;
}

const DemoStoreContext = createContext<DemoStoreContextValue | undefined>(undefined);

const STORAGE_KEY = 'securyhub_demo_db_v1';

function loadDatabase(): DemoDatabase {
  if (typeof window === 'undefined') {
    return demoSeed;
  }

  const value = localStorage.getItem(STORAGE_KEY);
  if (!value) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(demoSeed));
    return demoSeed;
  }

  try {
    const parsed = JSON.parse(value) as DemoDatabase;
    return {
      ...demoSeed,
      ...parsed,
      programs: parsed.programs.length ? parsed.programs : demoSeed.programs,
      users: parsed.users.length ? parsed.users : demoSeed.users
    };
  } catch (error) {
    console.warn('Failed to parse demo database', error);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(demoSeed));
    return demoSeed;
  }
}

function persistDatabase(db: DemoDatabase) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  }
}

export function DemoStoreProvider({ children }: { children: ReactNode }) {
  const [database, setDatabase] = useState<DemoDatabase>(loadDatabase);
  const [auth, setAuth] = useState<AuthState>({ user: null });

  useEffect(() => {
    persistDatabase(database);
  }, [database]);

  const login = useCallback(async (email: string) => {
    const user = database.users.find((candidate) => candidate.email === email);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    setAuth({ user });
  }, [database.users]);

  const signup = useCallback(async ({ email, name, role }: { email: string; name: string; role: Role; password: string }) => {
    if (database.users.some((candidate) => candidate.email === email)) {
      throw new Error('Email already registered');
    }
    const user: User = {
      id: nanoid(),
      email,
      role,
      name,
      createdAt: new Date().toISOString()
    };
    const nextDb = {
      ...database,
      users: [...database.users, user]
    };
    setDatabase(nextDb);
    setAuth({ user });
  }, [database]);

  const logout = useCallback(() => {
    setAuth({ user: null });
  }, []);

  const createProgram = useCallback<DemoStoreContextValue['createProgram']>(async (payload) => {
    if (!auth.user || auth.user.role !== 'organization') {
      throw new Error('Only organizations can create programs');
    }

    const now = new Date().toISOString();
    const program: Program = {
      ...payload,
      id: nanoid(),
      createdAt: now,
      updatedAt: now
    };

    setDatabase((prev) => ({ ...prev, programs: [...prev.programs, program] }));
    return program;
  }, [auth.user]);

  const submitReport = useCallback<DemoStoreContextValue['submitReport']>(async (payload) => {
    if (!auth.user || auth.user.role !== 'researcher') {
      throw new Error('Only researchers can submit reports');
    }

    const now = new Date().toISOString();
    const submission: Submission = {
      ...payload,
      id: nanoid(),
      status: 'submitted',
      reward: null,
      createdAt: now,
      updatedAt: now
    };

    setDatabase((prev) => ({ ...prev, submissions: [...prev.submissions, submission] }));
    return submission;
  }, [auth.user]);

  const updateSubmissionStatus = useCallback<DemoStoreContextValue['updateSubmissionStatus']>(
    async (id, status, reward = null) => {
      if (!auth.user || auth.user.role !== 'organization') {
        throw new Error('Only organizations can update submissions');
      }

      setDatabase((prev) => ({
        ...prev,
        submissions: prev.submissions.map((submission) =>
          submission.id === id
            ? { ...submission, status, reward: reward ?? submission.reward, updatedAt: new Date().toISOString() }
            : submission
        )
      }));
    },
    [auth.user]
  );

  const value = useMemo<DemoStoreContextValue>(() => ({
    auth,
    login,
    signup,
    logout,
    programs: database.programs,
    submissions: database.submissions,
    createProgram,
    submitReport,
    updateSubmissionStatus
  }), [auth, login, signup, logout, database.programs, database.submissions, createProgram, submitReport, updateSubmissionStatus]);

  return <DemoStoreContext.Provider value={value}>{children}</DemoStoreContext.Provider>;
}

export function useDemoStore() {
  const ctx = useContext(DemoStoreContext);
  if (!ctx) {
    throw new Error('useDemoStore must be used within DemoStoreProvider');
  }
  return ctx;
}
