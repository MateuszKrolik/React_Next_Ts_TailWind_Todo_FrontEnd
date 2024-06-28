'use client';
import { ChangeEvent, useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SuccessMessageComponent from '@/components/SuccessMessageComponent';
import ErrorMessageComponent from '@/components/ErrorMessageComponent';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { todoApi } from '@/redux/api';
import { authActions } from '@/redux/authSlice';

export default function LoginComponent() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const error = useAppSelector((state) => state.auth.error);

  const [formState, setFormState] = useState<{
    username: string;
    password: string;
  }>({
    username: '',
    password: '',
  });

  const [login, { isLoading }] = todoApi.useLoginMutation();

  const handleChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>) =>
    setFormState((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await login(formState).unwrap();
      dispatch(
        authActions.setCredentials({
          username: formState.username, 
          token: response.token, 
        })
      );
    } catch (err) {
      dispatch(authActions.setLoginFailed());
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push(`/welcome/${formState.username}`);
    }
  }, [isAuthenticated, formState.username, router]);

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
                value={formState.username}
                onChange={handleChange}
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
                value={formState.password}
                onChange={handleChange}
                placeholder="Password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button disabled={isLoading} type="submit" name="login" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
