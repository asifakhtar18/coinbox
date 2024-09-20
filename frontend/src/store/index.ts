import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import {setupListeners} from '@reduxjs/toolkit/query';
import AsyncStorage from '@react-native-async-storage/async-storage';

import userReducer from './slices/appSlice';
import authReducer from './slices/authSlice';
import {authApi} from './apis/authApi';
import {useAuth} from './slices/authSlice';
import {useApp} from './slices/appSlice';

import {
  setUser,
  setIsSignedIn,
  setToken,
  initializeAuthState,
} from './slices/authSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  app: userReducer,
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authApi.middleware),
});

setupListeners(store.dispatch);

//exports
export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export {
  authApi,
  setUser,
  setIsSignedIn,
  setToken,
  initializeAuthState,
  useAuth,
  useApp,
};

export {
  useLoginMutation,
  useRegisterMutation,
  useVerifyEmailMutation,
  useResendEmailMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetUserDetailsQuery,
} from './apis/authApi';
