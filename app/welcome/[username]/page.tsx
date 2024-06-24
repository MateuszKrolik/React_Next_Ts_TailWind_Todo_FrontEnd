// '@/app/welcome/[username]/page.tsx
'use client';
import AuthenticatedRoute from '@/components/security/AuthenticatedRoute';
import { useAppSelector } from '@/redux/hooks';
import Link from 'next/link';

function WelcomeComponent() {
  const username = useAppSelector((state) => state.auth.username);

  return (
    <AuthenticatedRoute>
      <div className="centered">
        <h1>Welcome {username}</h1>
        <div>
          <Link className="link link-primary" href="/todos">
            Manage your todos!
          </Link>
        </div>
      </div>
    </AuthenticatedRoute>
  );
}

export default WelcomeComponent;
