import LoginComponent from '@/app/login/page';
import WelcomeComponent from '@/app/welcome/[username]/page';

export default function TodoApp() {
  return (
    <div>
      <LoginComponent />
      <WelcomeComponent />
    </div>
  );
}
