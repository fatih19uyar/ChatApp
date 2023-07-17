import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../slice/authReducer';
import {reducer as formReducer} from 'redux-form';
import keyReducer from '../slice/keyReducer';

export const store = configureStore({
  reducer: {
    authReducer: authReducer,
    keyReducer: keyReducer,
    form: formReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
