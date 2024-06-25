'use client';
import AuthenticatedRoute from '@/components/security/AuthenticatedRoute';
import { todoApi, Todo } from '@/redux/api';
import { useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

export default function ListTodos() {
  const router = useRouter();
  const username = useAppSelector((state) => state.auth.username);
  const { data: todos } = todoApi.useRetrieveAllTodosForUsernameQuery(username);
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
        setMessage(`Delete error for todo of id: ${todo.id} ${errorMessage}`);
      }
    },
    [deleteOneTodoForUsername]
  );

  const updateTodo = (todo: Todo) => {
    router.push(`/todo/${todo.id}`);
  };
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
                <th>update</th>
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
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => updateTodo(todo)}
                    >
                      update
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
