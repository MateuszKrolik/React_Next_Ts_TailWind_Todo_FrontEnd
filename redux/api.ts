// '@/redux/api.ts'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from './store';

export interface Todo {
  id?: number; // auto-increment in db, so don't have to specify
  username: string;
  description: string;
  targetDate: string;
  done: boolean;
}

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;

      if (token) {
        headers.set('Authorization', `${token}`);
      } 

      return headers;
    },
  }),
  tagTypes: ['Todos'],
  endpoints: (builder) => ({
    retrieveAllTodosForUsername: builder.query<Todo[], string>({
      query: (username) => `/v1/users/${username}/todos`,
      providesTags: [{ type: 'Todos', id: 'LIST' }],
    }),
    retrieveOneTodoForUsername: builder.query<
      Todo,
      { id: number; username: string }
    >({
      query: ({ id, username }) => `/v1/users/${username}/todos/${id}`,
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
    updateOneTodoForUsername: builder.mutation<Todo, Todo>({
      query(todo) {
        return {
          url: `/v1/users/${todo.username}/todos/${todo.id}`,
          method: 'PUT',
          body: todo,
        };
      },
      invalidatesTags: [{ type: 'Todos', id: 'LIST' }], // automatically re-run query and update page
    }),
    addOneTodoForUsername: builder.mutation<Todo, Todo>({
      query(todo) {
        return {
          url: `/v1/users/${todo.username}/todos`,
          method: 'POST',
          body: todo,
        };
      },
      invalidatesTags: [{ type: 'Todos', id: 'LIST' }], // automatically re-run query and update page
    }),
  }),
});
