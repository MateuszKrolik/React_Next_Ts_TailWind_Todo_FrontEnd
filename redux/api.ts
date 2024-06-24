import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Todo {
  id: number;
  username: string;
  description: string;
  targetDate: Date;
  done: boolean;
}

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  tagTypes: ['Todos'],
  endpoints: (builder) => ({
    retrieveAllTodosForUsername: builder.query<Todo[], string>({
      query: (username) => `/v1/users/${username}/todos`,
      providesTags: [{ type: 'Todos', id: 'LIST' }],
    }),
    deleteOneTodoForUsername: builder.mutation<Todo, Todo>({
      query(todo) {
        return {
          url: `/v1/users/${todo.username}/todos/${todo.id}`,
          method: 'DELETE',
          body: todo,
        };
      },
      invalidatesTags: [{ type: 'Todos', id: 'LIST' }], // automatically re-run query and update page
    }),
  }),
});
