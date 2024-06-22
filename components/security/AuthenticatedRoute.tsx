'use client';
import { ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { redirect } from 'next/navigation';

export default function AuthenticatedRoute({
  children,
}: {
  children: ReactNode;
}) {
  const authContext = useAuth();

  if (authContext.isAuthenticated) {
    return children;
  } else {
    redirect('/login');
  }
}
