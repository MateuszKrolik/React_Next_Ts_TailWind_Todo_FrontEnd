import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { todoApi } from './api';

const initialAuthState = {
  isAuthenticated: false,
  username: '',
  token: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: { username, token },
      }: PayloadAction<{ username: string; token: string }>
    ) => {
      state.username = username;
      state.token = token;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.username = '';
      state.token = '';
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      todoApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.token;
        state.username = payload.username;
        state.isAuthenticated = true;
      }
    );
  },
});

export const logoutAsync = createAsyncThunk(
  'auth/logoutAsync',
  (_, { dispatch }) => {
    dispatch(authActions.logout());
  }
);

export const authActions = authSlice.actions;

export default authSlice.reducer;
