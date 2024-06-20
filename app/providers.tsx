//@/app/providers.tsx
'use client';

import { ReactNode } from 'react';
import AuthProvider from '@/components/security/AuthContext';

export function Providers({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
