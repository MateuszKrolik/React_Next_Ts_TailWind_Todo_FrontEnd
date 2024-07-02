// '@/app/signup/page.tsx'
'use client';
import { useRouter } from 'next/navigation';
import { todoApi, SignupResponse } from '@/redux/api';
import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ErrorAlert from '@/components/ErrorAlert';
import Link from 'next/link';

interface ApiError {
  data: SignupResponse;
}

const schema = z
  .object({
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required'),
    confirmPassword: z.string().min(1, 'Confirm Password is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'], // attach error
  });

type FormFields = z.infer<typeof schema>;

export default function SignupComponent() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const [signup, { isLoading }] = todoApi.useSignupMutation();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await signup(data).unwrap();
      router.push('/login');
    } catch (error) {
      const apiError = error as ApiError;
      setError('root', {
        message: apiError.data?.message,
      });
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col">
        <div className="text-center">
          <h1 className="text-5xl font-bold">SignUp now!</h1>
        </div>
        {errors.root && (
          <ErrorAlert data-testid="error-alert" message={errors.root.message} />
        )}
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
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                {...register('confirmPassword')}
                placeholder="Confirm Password"
                className="input input-bordered"
              />
              {errors.confirmPassword && (
                <div className="text-red-500">
                  {errors.confirmPassword.message}
                </div>
              )}
            </div>
            <div className="form-control mt-6">
              <button
                disabled={isLoading}
                type="submit"
                name="login"
                className="btn btn-primary"
              >
                {isLoading ? 'Loading...' : 'SignUp'}
              </button>
            </div>
            <label className="label">
              <Link href="/login" className="label-text-alt link link-hover">
                Already have an Account? Login.
              </Link>
            </label>
          </form>
        </div>
      </div>
    </div>
  );
}
