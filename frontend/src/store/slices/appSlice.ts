import {createSlice} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    isLoading: false,
  },
  reducers: {
    setIsLoading(state, {payload}) {
      state.isLoading = payload;
    },

    initializeAppState(state) {
      return state;
    },
  },
});

export const {setIsLoading} = appSlice.actions;

export const useApp = () => {
  return useSelector((state: any) => state.app);
};

export const initializeAppState = () => appSlice.getInitialState();

export default appSlice.reducer;
