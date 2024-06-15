'use client';
import { MouseEvent, ChangeEvent, useState } from 'react';
import SuccessMessageComponent from '@/components/SuccessMessageComponent';
import ErrorMessageComponent from '@/components/ErrorMessageComponent';

export default function TodoApp() {
  return (
    <div>
      <LoginComponent />
      {/* <WelcomeComponent /> */}
    </div>
  );
}

function LoginComponent() {
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

  function handleSubmit(event: MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    if (username === 'mateusz' && password === 'dummy') {
      setShowSuccessMessage(true);
      setShowErrorMessage(false);
    } else {
      setShowErrorMessage(true);
      setShowSuccessMessage(false);
    }
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
        </div>
        <SuccessMessageComponent showSuccessMessage={showSuccessMessage} />
        <ErrorMessageComponent showErrorMessage={showErrorMessage} />
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body">
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
                type="button"
                name="login"
                onClick={handleSubmit}
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

// function WelcomeComponent() {
//   return <div>WelcomeComponent</div>;
// }
