import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialAuthState = { isAuthenticated: false, error: false, username: '' };

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
        state.username = username; 
      } else {
        state.isAuthenticated = false;
        state.error = true;
      }
    },
    logout(state) {
      state.isAuthenticated = false;
      state.username = ''; 
    },
    setUsername(state, action) {
      state.username = action.payload;
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
