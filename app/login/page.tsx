'use client';
import { ChangeEvent, useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import SuccessMessageComponent from '@/components/SuccessMessageComponent';
import ErrorMessageComponent from '@/components/ErrorMessageComponent';
import { useAuth } from '@/components/security/AuthContext';

export default function LoginComponent() {
  const router = useRouter();
  const authContext = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  function handleUsernameChange(event: ChangeEvent<HTMLInputElement>): void {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>): void {
    setPassword(event.target.value);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (username === 'mateusz' && password === 'dummy') {
      authContext.setIsAuthenticated(true);
      setShowSuccessMessage(true);
      setShowErrorMessage(false);
      router.push(`/welcome/${username}`);
    } else {
      authContext.setIsAuthenticated(false);
      setShowErrorMessage(true);
      setShowSuccessMessage(false);
    }
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col">
        <div className="text-center">
          <h1 className="text-5xl font-bold">Login now!</h1>
        </div>
        <SuccessMessageComponent showSuccessMessage={showSuccessMessage} />
        <ErrorMessageComponent showErrorMessage={showErrorMessage} />
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="username"
                name="username"
                value={username}
                onChange={handleUsernameChange}
                placeholder="Username"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button
                type="submit"
                name="login"
                // onClick={handleSubmit}
                className="btn btn-primary"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
