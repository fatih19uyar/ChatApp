import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  user: {
    id: string;
    email: string;
  } | null;
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

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: state => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (
      state,
      action: PayloadAction<{id: string; email: string}>,
    ) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      // Kullanıcı bilgilerini AsyncStorage'e kaydetme
      AsyncStorage.setItem('user', JSON.stringify(action.payload));
    },
    logOut: state => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      // Kullanıcı bilgilerini AsyncStorage'e silme
      AsyncStorage.removeItem('user');
    },
  },
});

export const {loginStart, loginSuccess, logOut} = authSlice.actions;

export default authSlice.reducer;
