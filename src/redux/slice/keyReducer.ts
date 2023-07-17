import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface KeyState {
  keys: {[key: string]: string};
}

const initialState: KeyState = {
  keys: {},
};

const keySlice = createSlice({
  name: 'key',
  initialState,
  reducers: {
    addKey: (state, action: PayloadAction<{secretKey: string}>) => {
      const {secretKey} = action.payload;
      state.keys[secretKey] = new Date().toISOString();
    },
    removeKey: (state, action: PayloadAction<string>) => {
      const key = action.payload;
      delete state.keys[key];
    },
  },
});

export const {addKey, removeKey} = keySlice.actions;

export default keySlice.reducer;
