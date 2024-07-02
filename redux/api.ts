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

export interface UserResponse {
  username: string;
  token: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface SignupResponse {
  message: string;
}

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;

      headers.set('Content-Type', 'application/json');

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['User', 'Todos'],
  endpoints: (builder) => ({
    signup: builder.mutation<SignupResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/v1/signup',
        method: 'POST',
        body: credentials,
        invalidatesTags: [{ type: 'User' }],
      }),
    }),
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/v1/login',
        method: 'POST',
        body: credentials,
        invalidatesTags: [{ type: 'User' }],
      }),
    }),
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
