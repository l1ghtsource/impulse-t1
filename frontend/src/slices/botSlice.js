import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Проверяем localStorage и получаем данные или используем пустой массив
const initialState = {
  data: [], // Поле для записи данных с API
  items: JSON.parse(localStorage.getItem("botSliceState")) || [],
  error: null,
  loading: false,
  chatloading: false,
  answer: '',
};

// Создаем thunk для выполнения POST-запроса
export const fetchData = createAsyncThunk(
  "botSlice/fetchData",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://51.250.42.179:8000/api/config/addServicesAndPrompt",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Ошибка при выполнении запроса");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchChatResponse = createAsyncThunk(
  "botSlice/fetchChatResponse",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetch("http://51.250.42.179:8000/api/config/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Ошибка при выполнении запроса");
      }

      const data = await response.json();
      return data; // Предполагается, что ответ содержит поле `answer`
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const botSlice = createSlice({
  name: "botSlice",
  initialState,
  reducers: {
    addElement(state, action) {
      state.items.push(action.payload);
      localStorage.setItem("botSliceState", JSON.stringify(state.items));
    },
    addMessageToChat(state, action) {
      const { id, newMessages } = action.payload;
      if (state.items.find(el => el.id === id).messages){
        state.items.find(el => el.id === id).messages = [...state.items.find(el => el.id === id).messages, ...newMessages];
      }
      else {
        state.items.find(el => el.id === id).messages = newMessages;
      }
        localStorage.setItem("botSliceState", JSON.stringify(state.items)); // Обновляем localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchChatResponse.pending, (state) => {
        state.chatloading = true;
        state.error = null;
      })
      .addCase(fetchChatResponse.fulfilled, (state, action) => {
        state.answer = action.payload.answer; // Сохраняем ответ
        state.chatloading = false;
      })
      .addCase(fetchChatResponse.rejected, (state, action) => {
        state.error = action.payload;
        state.chatloading = false;
      });
  },
});

export const { addElement, addMessageToChat } = botSlice.actions;

export default botSlice.reducer;
