// @/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { todoApi } from './api'; // Import your todoApi

const store = configureStore({
  reducer: {
    auth: authReducer,
    [todoApi.reducerPath]: todoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
