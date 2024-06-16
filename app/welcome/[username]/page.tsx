// '@/app/welcome/[username]/page.tsx
import Link from 'next/link';

interface WelcomeComponentProps {
  params?: {
    username: string;
  };
}

export default function WelcomeComponent({ params }: WelcomeComponentProps) {
  return (
    <div className="centered">
      <h1>Welcome {params?.username}</h1>
      <div>
        <Link className="link link-primary" href="/todos">
          Manage your todos!
        </Link>
      </div>
    </div>
  );
}
