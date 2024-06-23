'use client';
import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export default function AuthenticatedRoute({
  children,
}: {
  children: ReactNode;
}) {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  if (isAuthenticated) {
    return children;
  } else {
    redirect('/login');
  }
}
