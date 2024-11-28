import { configureStore } from '@reduxjs/toolkit';
import createBotSlice from '../slices/createBotSlice';
import botSlice from "../slices/botSlice";
import userSlice from "../slices/userSlice";

const store = configureStore({
  reducer: {
    createBot: createBotSlice, 
    bot: botSlice,
    user:userSlice// исправлено имя редюсера
  },
});

export default store;
