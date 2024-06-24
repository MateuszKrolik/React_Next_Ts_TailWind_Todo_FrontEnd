'use client';
import AuthenticatedRoute from '@/components/security/AuthenticatedRoute';
import { todoApi, Todo } from '@/redux/api';
import { useCallback, useState } from 'react';

export default function ListTodos() {
  const { data: todos } =
    todoApi.useRetrieveAllTodosForUsernameQuery('mateusz');
  const [deleteOneTodoForUsername] =
    todoApi.useDeleteOneTodoForUsernameMutation();
  const [message, setMessage] = useState<string | null>(null);

  const onDelete = useCallback(
    async (todo: Todo) => {
      try {
        await deleteOneTodoForUsername(todo).unwrap(); // unwrap to access error immediately after mutation
        setMessage(`Deletion of todo with id: ${todo.id} successful`);
      } catch (error) {
        const errorMessage = (error as Error).message;
        setMessage(`Error: ${errorMessage}`);
      }
    },
    [deleteOneTodoForUsername]
  );

  return (
    <AuthenticatedRoute>
      <div className="centered">
        <h1>Things you want to do!</h1>
        <div className="overflow-x-auto">
          {message && (
            <div role="alert" className="alert alert-warning">
              {message}
            </div>
          )}
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>id</th>
                <th>description</th>
                <th>done</th>
                <th>targetDate</th>
                <th>delete</th>
              </tr>
            </thead>
            <tbody>
              {todos?.map((todo) => (
                <tr key={todo.id}>
                  <th>{todo.id}</th>
                  <td>{todo.description}</td>
                  <td>{todo.done.toString()}</td>
                  <td>{todo.targetDate.toString()}</td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => onDelete(todo)}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AuthenticatedRoute>
  );
}
