// '@/app/welcome/[username]/page.tsx

interface WelcomeComponentProps {
  params?: {
    username: string;
  };
}

export default function WelcomeComponent({ params }: WelcomeComponentProps) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Welcome {params?.username}</h1>
      <div>Welcome Component</div>
    </div>
  );
}
