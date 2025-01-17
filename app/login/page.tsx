'use client';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { todoApi } from '@/redux/api';
import { authActions } from '@/redux/authSlice';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ErrorAlert from '@/components/ErrorAlert';
import Link from 'next/link';

const schema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

type FormFields = z.infer<typeof schema>;

export default function LoginComponent() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const [login, { isLoading }] = todoApi.useLoginMutation();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const response = await login(data).unwrap();
      dispatch(
        authActions.setCredentials({
          username: data.username,
          token: response.token,
        })
      );
      router.push(`/welcome/${data.username}`);
    } catch (err) {
      setError('root', {
        message: 'Authentication failed! Check your credentials!',
      });
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col">
        <div className="text-center">
          <h1 className="text-5xl font-bold">Login now!</h1>
        </div>
        {errors.root && <ErrorAlert message={errors.root.message} />}
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="username"
                {...register('username')}
                placeholder="Username"
                className="input input-bordered"
              />
              {errors.username && (
                <div className="text-red-500">{errors.username.message}</div>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register('password')}
                placeholder="Password"
                className="input input-bordered"
              />
              {errors.password && (
                <div className="text-red-500">{errors.password.message}</div>
              )}
            </div>
            <div className="form-control mt-6">
              <button
                disabled={isLoading}
                type="submit"
                name="login"
                className="btn btn-primary"
              >
                {isLoading ? 'Loading...' : 'Login'}
              </button>
            </div>
            <label className="label">
              <Link href="/signup" className="label-text-alt link link-hover">
                Don&apos;t have an account? Signup.
              </Link>
            </label>
          </form>
        </div>
      </div>
    </div>
  );
}
