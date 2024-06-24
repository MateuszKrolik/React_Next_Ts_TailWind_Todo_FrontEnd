// '@/components/HeaderComponent.tsx}
'use client';
import Link from 'next/link';

import { useAppSelector, useAppDispatch } from '@/redux/hooks';

import { logoutAsync } from '@/redux/authSlice';
import { useRouter } from 'next/navigation';

export default function HeaderComponent({
  params,
}: {
  params?: { username: string };
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const logout = async () => {
    await dispatch(logoutAsync()).unwrap(); // ".unwrap()" to await completion
    router.push('/logout');
  };

  return (
    <div className="navbar bg-primary sticky top-0">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              {isAuthenticated && (
                <Link href={`/welcome/${params?.username}`}>Home</Link>
              )}
            </li>
            <li>
              {isAuthenticated && (
                <Link href={`/welcome/${params?.username}`}>Todos</Link>
              )}
            </li>
          </ul>
        </div>
        <Link
          href={isAuthenticated ? `/welcome/${params?.username}` : '/login'}
          className="btn btn-ghost text-xl"
        >
          MK Todos
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            {isAuthenticated && (
              <Link href={`/welcome/${params?.username}`}>Home</Link>
            )}
          </li>
          <li>
            {isAuthenticated && (
              <Link href={`/welcome/${params?.username}`}>Todos</Link>
            )}
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {isAuthenticated ? (
          <button className="btn btn-ghost" onClick={logout}>
            LogOut
          </button>
        ) : (
          <Link href="/login" className="btn btn-ghost">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
