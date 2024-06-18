// '@/components/HeaderComponent.tsx}

import Link from 'next/link';

export default function HeaderComponent({
  params,
}: {
  params: { username: string };
}) {
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
              <Link href={`/welcome/${params?.username}`}>Home</Link>
            </li>
            <li>
              <Link href="/todos">Todos</Link>
            </li>
          </ul>
        </div>
        <Link
          href={`/welcome/${params?.username}`}
          className="btn btn-ghost text-xl"
        >
          MK Todos
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href={`/welcome/${params?.username}`}>Home</Link>
          </li>
          <li>
            <Link href="/todos">Todos</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <Link href="/login" className="btn btn-ghost">
          Login
        </Link>
        <Link href="/logout" className="btn btn-ghost">
          Logout
        </Link>
      </div>
    </div>
  );
}
