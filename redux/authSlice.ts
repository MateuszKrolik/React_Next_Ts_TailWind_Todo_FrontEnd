import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialAuthState = { isAuthenticated: false, error: false };

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      const username = action.payload.username;
      const password = action.payload.password;
      if (username === 'mateusz' && password === 'dummy') {
        state.isAuthenticated = true;
        state.error = false;
      } else {
        state.isAuthenticated = false;
        state.error = true;
      }
    },
    logout(state) {
      state.isAuthenticated = false;
    },
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
