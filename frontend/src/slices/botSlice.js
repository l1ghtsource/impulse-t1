import { createSlice } from "@reduxjs/toolkit";

// Проверяем localStorage и получаем данные или используем пустой массив
const initialState = JSON.parse(localStorage.getItem("botSliceState")) || [];

const botSlice = createSlice({
  name: "botSlice",
  initialState,
  reducers: {
    addElement(state, action) {
      state.push(action.payload);
      // Обновляем localStorage после изменения состояния
      localStorage.setItem("botSliceState", JSON.stringify(state));
    },
  },
});

export const { addElement } = botSlice.actions;

// Редьюсер
export default botSlice.reducer;
