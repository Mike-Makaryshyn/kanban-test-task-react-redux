import { configureStore } from '@reduxjs/toolkit';
import appSlice from './slices/appSlice';
import thunk from 'redux-thunk';

const store = configureStore({
  reducer: {
    app: appSlice,
  },
  middleware: [thunk]
});

export default store;
