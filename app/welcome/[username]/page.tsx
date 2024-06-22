// '@/app/welcome/[username]/page.tsx
import AuthenticatedRoute from '@/components/security/AuthenticatedRoute';
import Link from 'next/link';

interface WelcomeComponentProps {
  params?: {
    username: string;
  };
}

function WelcomeComponent({ params }: WelcomeComponentProps) {
  return (
    <AuthenticatedRoute>
      <div className="centered">
        <h1>Welcome {params?.username}</h1>
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
