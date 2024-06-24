'use client';
import { ChangeEvent, useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SuccessMessageComponent from '@/components/SuccessMessageComponent';
import ErrorMessageComponent from '@/components/ErrorMessageComponent';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { authActions } from '@/redux/authSlice';

export default function LoginComponent() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const error = useAppSelector((state) => state.auth.error);

  const [username, setUsername] = useState('mateusz');
  const [password, setPassword] = useState('dummy');

  function handleUsernameChange(event: ChangeEvent<HTMLInputElement>): void {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>): void {
    setPassword(event.target.value);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    dispatch(authActions.login({ username, password }));
  }

  useEffect(() => {
    if (isAuthenticated) {
      router.push(`/welcome/${username}`);
    }
  }, [isAuthenticated, username, router]);

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col">
        <div className="text-center">
          <h1 className="text-5xl font-bold">Login now!</h1>
        </div>
        {isAuthenticated && (
          <SuccessMessageComponent showSuccessMessage={true} />
        )}
        {error && <ErrorMessageComponent showErrorMessage={true} />}
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
              <button type="submit" name="login" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
