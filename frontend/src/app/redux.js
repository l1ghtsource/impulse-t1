import { configureStore } from '@reduxjs/toolkit';
import createBotSlice from '../slices/createBotSlice';

const store = configureStore({
  reducer: {
    createBot: createBotSlice, // исправлено имя редюсера
  },
});

export default store;
