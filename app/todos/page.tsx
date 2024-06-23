'use client';
import AuthenticatedRoute from '@/components/security/AuthenticatedRoute';
import { todoApi } from '@/redux/api';

export default function ListTodos() {
  const { data: todos } =
    todoApi.useRetrieveAllTodosForUsernameQuery('mateusz');

  return (
    <AuthenticatedRoute>
      <div className="centered">
        <h1>Things you want to do!</h1>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>id</th>
                <th>description</th>
                <th>done</th>
                <th>targetDate</th>
              </tr>
            </thead>
            <tbody>
              {todos?.map((todo) => (
                <tr key={todo.id}>
                  <th>{todo.id}</th>
                  <td>{todo.description}</td>
                  <td>{todo.done.toString()}</td>
                  <td>{todo.targetDate.toString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AuthenticatedRoute>
  );
}
