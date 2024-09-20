import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';
import {RootState} from '../index';

interface AuthState {
  isSignedIn: boolean;
  token: string | null;
  user: object | null;
  userEmail: string | null;
}

const initialState: AuthState = {
  isSignedIn: false,
  token: null,
  user: null,
  userEmail: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<object | null>) {
      state.user = action.payload;
    },
    setIsSignedIn(state, action: PayloadAction<boolean>) {
      state.isSignedIn = action.payload;
    },
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
    },
    setUserEmail(state, action: PayloadAction<string | null>) {
      state.userEmail = action.payload;
    },
    initializeAuthState(state) {
      return initialState;
    },
  },
});

export const {
  setUser,
  setIsSignedIn,
  setToken,
  setUserEmail,
  initializeAuthState,
} = authSlice.actions;

// Selector
export const selectAuth = (state: RootState) => state.auth;

export const useAuth = () => {
  return useSelector(selectAuth);
};

export default authSlice.reducer;
