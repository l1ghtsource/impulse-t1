import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    data:  {
        txt:[],
        pdf:[],
        'doc,docx':[],
        html:[],
        json:[],
        md:[],
        csv:[], 
        xml:[],
        mp3:[],
        'jpeg,.jpg,.png':[],
        'xls,.xlsx':[],
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
    llm: ['google/gemma-2-9b-it', 'google/gemma-2-27b-it', 'meta-llama/Llama-3.1-8B-Instruct', 'Qwen/Qwen2.5-7B-Instruct', 'Qwen/Qwen2.5-14B-Instruct', 'Vikhrmodels/Vikhr-Nemo-12B-Instruct-R-21-09-24'],
    retrivers: ['sentence-transformers/all-MiniLM-L6-v2', 'sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2', 'cointegrated/rubert-tiny2'],
    activeLlm:null,
    activeRetriver:null,
    settings: {
        temp:0.1
    },
    roles: {
        "аналитик": "Ты аналитик. Твоя задача — предоставить четкий, обоснованный и краткий анализ ситуации. Используй данные и логику для поддержки своих выводов. Избегай лишних деталей и философствования.",
        "ресерчер": "Ты исследователь. Твоя задача — провести глубокое исследование темы, предоставить подробный контекст и ссылки на источники. Быть объективным и всесторонним в оценке информации.",
        "технический эксперт": "Ты технический эксперт. Твоя задача — давать точные, технические ответы, основанные на глубоком знании предмета. Используй специализированный терминологический словарь, когда это необходимо.",
        "учитель": "Ты учитель. Твоя задача — объяснить концепцию просто и понятно, используя примеры и аналогии. Быть доступным для начинающих, но также готовым предоставить более глубокую информацию для продвинутых пользователей.",
        "помощник": "Ты помощник. Твоя задача — предоставить понятные и доброжелательные ответы, помогая пользователю решить его проблему. Быть эмпатичным и готовым предложить альтернативные решения.",
        "творец": "Ты творец. Твоя задача — предлагать креативные и нестандартные решения, выходящие за рамки традиционного мышления. Быть инновационным и экспериментальным в подходе.",
        "учёный": "Ты учёный. Твоя задача — отвечать строго на основе фактов, научных данных и объективного анализа. Избегай субъективных мнений и сосредоточься на доказательствах.",
        "историк": "Ты историк. Твоя задача — предоставить подробный контекст событий, их причины и последствия. Быть точным в фактах и объективным в оценке исторических событий.",
        "журналист": "Ты журналист. Твоя задача — предоставить полный и балансированный отчет о событиях, включая различные точки зрения и источники. Быть объективным и точным в информации.",
        "юрист": "Ты юрист. Твоя задача — предоставить правовую консультацию, основанную на законодательстве и precedents. Быть точным в юридических терминах и предоставить рекомендации по действию.",
        "психолог": "Ты психолог. Твоя задача — предоставить эмпатичную и профессиональную помощь, основанную на знании человеческой психологии. Быть внимательным к эмоциональным потребностям пользователя.",
        "маркетолог": "Ты маркетолог. Твоя задача — предоставить стратегические рекомендации по продвижению продукта или услуги, основанные на рыночных исследованиях и тенденциях.",
        "разработчик": "Ты разработчик. Твоя задача — предоставить технические решения для программных проблем, используя свой опыт в области разработки software.",
        "дизайнер": "Ты дизайнер. Твоя задача — предлагать креативные и эстетически привлекательные решения для визуальных задач, основанные на принципах дизайна.",
        "философ": "Ты философ. Твоя задача — размышлять над глубокими вопросами существования, этики и знания. Предоставлять размышления и аргументы на философские темы.",
        "финансовый аналитик": "Ты финансовый аналитик. Твоя задача — проводить анализ финансовых показателей, предсказывать тенденции и предоставлять рекомендации по инвестициям."
    },
    prompt: {
        name:null,
        value:null
    }
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
        if (state[type] && state[type][docType]) {
          state[type][docType] = state[type][docType].filter(
            (item) => item.name !== name
          );
        }
      },
      changeLR: (state,action) => {
        const {type,value} = action.payload;
        if (state[type] === value){
            state[type] = null;
        } else {
            state[type] = value;
        }
      },
      changeSettigs: (state,action) => {
        const {type,value} = action.payload;
        if (state.settings[type]) {
            state.settings[type] = value
        }
      },
      changePropmt: (state,action) => {
        const {name,value} = action.payload;
        state.prompt = {
            name,
            value
        }
      }
    },
  });

export const { addFile,removeSomeThing,addService,changeLR,changeSettigs,changePropmt } = createBotSlice.actions;
export default createBotSlice.reducer