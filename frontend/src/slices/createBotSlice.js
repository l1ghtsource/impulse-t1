import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    data:  {
        txt:[],
        pdf:[], 
        csv:[], 
        sql:[],
        mp3:[],
        xls:[],
        xlsx:[]
    },
    services: {
        urls:[],
        confluence:[],
        notion:[],
        figma:[],
        github:[],
        wiki:[],
        trello:[],
        youtube:[]
    },
    llm: ['google/gemma-2-9b-it', 'google/gemma-2-27b-it', 'meta-llama/Llama-3.1-8B-Instruct', 'Qwen/Qwen2.5-7B-Instruct, Qwen/Qwen2.5-14B-Instruct', 'Vikhrmodels/Vikhr-Nemo-12B-Instruct-R-21-09-24'],
    retrivers: ['sentence-transformers/all-MiniLM-L6-v2', 'sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2', 'cointegrated/rubert-tiny2'],
    settings: 0.1
}

const createBotSlice = createSlice({
    name: "createBotSlice",
    initialState,
    reducers: {
      addFile: (state, action) => {
        const { fileType, files } = action.payload;
        if (state.data[fileType]) {
          state.data[fileType] = [...state.data[fileType], ...files];
        }
      },
      addService: (state,action) => {
        const {serviceType,link} = action.payload;
        if (state.services[serviceType]){
            state.services[serviceType] = [link,...state.services[serviceType]]
        }
      },
      removeSomeThing: (state, action) => {
        const { docType, name, type } = action.payload;

        if (type === 'services') {
            if (state[type] && state[type][docType]) {
                state[type][docType] = state[type][docType].filter(
                  (item) => item !== name
                );
              }
              return;
        }
        // Проверяем наличие поля `type` и подтипа `docType`
        if (state[type] && state[type][docType]) {
          state[type][docType] = state[type][docType].filter(
            (item) => item.name !== name
          );
        }
      },
    },
  });

export const { addFile,removeSomeThing,addService } = createBotSlice.actions;
export default createBotSlice.reducer