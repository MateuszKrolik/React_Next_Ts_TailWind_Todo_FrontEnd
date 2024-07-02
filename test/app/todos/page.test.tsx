import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import ListTodos from '@/app/todos/page';
import { initializeStore } from '@/redux/store';

const initialState = {
  auth: {
    isAuthenticated: true,
    username: 'testUser',
    token: 'mockToken',
  },
};

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

beforeEach(() => {
  fetchMock.resetMocks();
});

const testTodos = [
  {
    id: 1,
    username: 'testUser',
    description: 'Test Todo',
    targetDate: '2023-01-01',
    done: false,
  },
  {
    id: 2,
    username: 'testUser2',
    description: 'Test Todo2',
    targetDate: '2023-01-02',
    done: true,
  },
];

describe('ListTodos Component', () => {
  it('Checks if the heading is displayed correctly', () => {
    render(
      <Provider store={initializeStore(initialState)}>
        <ListTodos />
      </Provider>
    );

    expect(
      screen.getByRole('heading', { name: 'Things you want to do!' })
    ).toBeInTheDocument();
  });

  it('Checks if the todos are correctly displayed in table', async () => {
    await fetchMock.mockResponseOnce(JSON.stringify(testTodos));

    render(
      <Provider store={initializeStore(initialState)}>
        <ListTodos />
      </Provider>
    );

    const tableElements = await screen.findAllByRole('table');
    expect(tableElements).not.toHaveLength(0);
  });
});
