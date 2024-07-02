// @/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { todoApi } from './api';

export const initializeStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      auth: authReducer,
      [todoApi.reducerPath]: todoApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(todoApi.middleware),
    devTools: true,
    preloadedState,
  });
};

const store = initializeStore();

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
