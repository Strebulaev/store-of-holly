import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ipcRenderer } from 'electron';

interface AuthState {
  user: any | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    checkAuth: (state) => {
      state.loading = true;
      const token = localStorage.getItem('token');
      if (token) {
        ipcRenderer.invoke('auth:validate-token', token).then((response) => {
          if (response.success) {
            state.user = response.user;
            state.isAuthenticated = true;
          } else {
            localStorage.removeItem('token');
          }
          state.loading = false;
        });
      } else {
        state.loading = false;
      }
    },
    login: (state, action: PayloadAction<{ email: string; password: string }>) => {
      state.loading = true;
      ipcRenderer
        .invoke('auth:login', action.payload)
        .then((response) => {
          if (response.success) {
            state.user = response.user;
            state.isAuthenticated = true;
            localStorage.setItem('token', response.token);
          } else {
            state.error = response.error;
          }
          state.loading = false;
        })
        .catch((err) => {
          state.error = err.message;
          state.loading = false;
        });
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
  },
});

export const { checkAuth, login, logout } = authSlice.actions;
export default authSlice.reducer;
