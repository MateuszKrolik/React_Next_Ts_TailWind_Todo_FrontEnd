import AuthenticatedRoute from '@/components/security/AuthenticatedRoute';

export default function ListTodos() {
  const today = new Date();
  const targetDate = new Date(
    today.getFullYear() + 12,
    today.getMonth(),
    today.getDay()
  );
  const todos = [
    { id: 1, description: 'Learn AWS', done: false, targetDate: targetDate },
    { id: 2, description: 'Learn GCP', done: true, targetDate: targetDate },
    { id: 3, description: 'Learn Azure', done: false, targetDate: targetDate },
    { id: 4, description: 'Learn DevOps', done: true, targetDate: targetDate },
  ];
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
              {todos.map((todo) => (
                <tr key={todo.id}>
                  <th>{todo.id}</th>
                  <td>{todo.description}</td>
                  <td>{todo.done.toString()}</td>
                  <td>{todo.targetDate.toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AuthenticatedRoute>
  );
}
