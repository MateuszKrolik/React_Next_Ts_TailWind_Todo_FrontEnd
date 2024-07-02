import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import SignupComponent from '@/app/signup/page';
import userEvent from '@testing-library/user-event';
import store from '@/redux/store';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('Signup page', () => {
  it('Should render properly', () => {
    render(
      <Provider store={store}>
        <SignupComponent />
      </Provider>
    );

    const header = screen.getByRole('heading');
    const headerText = 'SignUp now!';
    expect(header).toHaveTextContent(headerText);
  });

  it('Does not display any message upon empty form submission', () => {
    render(
      <Provider store={store}>
        <SignupComponent />
      </Provider>
    );

    userEvent.type(screen.getByPlaceholderText('Username'), '');
    userEvent.type(screen.getByPlaceholderText('Password'), '');
    userEvent.type(screen.getByPlaceholderText('Confirm Password'), '');

    userEvent.click(screen.getByRole('button', { name: 'SignUp' }));

    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('Does not display any message upon no form submission', () => {
    render(
      <Provider store={store}>
        <SignupComponent />
      </Provider>
    );

    expect(screen.queryByRole('alert')).toBeNull();
  });
});
