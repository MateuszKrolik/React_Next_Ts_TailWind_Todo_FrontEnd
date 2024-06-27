import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialAuthState = {
  isAuthenticated: false,
  error: false,
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
      state.error = false;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.username = '';
      state.token = '';
      state.error = false;
    },
    setLoginFailed(state) {
      state.error = true;
    },
  },
});

export const logoutAsync = createAsyncThunk(
  'auth/logoutAsync',
  (_, { dispatch }) => {
    dispatch(authActions.logout());
  }
);

export const loginAsync = createAsyncThunk(
  'auth/loginAsync',
  async (
    { username, password }: { username: string; password: string },
    { dispatch, rejectWithValue }
  ) => {
    const token = 'Basic ' + window.btoa(username + ':' + password);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/v1/basicauth`,
        {
          method: 'GET',
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.ok) {
        dispatch(authActions.setCredentials({ username, token }));
      } else {
        dispatch(authActions.setLoginFailed());
      }
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const authActions = authSlice.actions;

export default authSlice.reducer;
