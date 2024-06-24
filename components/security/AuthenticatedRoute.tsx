'use client';
import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';

export default function AuthenticatedRoute({
  children,
}: {
  children: ReactNode;
}) {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  if (isAuthenticated) {
    return children;
  } else {
    redirect('/login');
  }
}
