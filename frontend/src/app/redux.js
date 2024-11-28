import { configureStore } from '@reduxjs/toolkit';
import createBotSlice from '../slices/createBotSlice';
import botSlice from "../slices/botSlice";
const store = configureStore({
  reducer: {
    createBot: createBotSlice, 
    bot: botSlice// исправлено имя редюсера
  },
});

export default store;
