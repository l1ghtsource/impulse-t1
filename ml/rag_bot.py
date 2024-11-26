from typing import Optional, Dict, Any

from transformers import AutoModelForCausalLM, AutoTokenizer
from langchain.document_loaders import PyPDFLoader, TextLoader
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain.chat_models.gigachat import GigaChat
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import FAISS
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory
from langchain.llms import HuggingFacePipeline


class EnhancedConversationBufferMemory(ConversationBufferMemory):
    def save_context(self, inputs: Dict[str, Any], outputs: Dict[str, str]) -> None:
        if self.input_key is None:
            self.input_key = list(inputs.keys())[0]

        if self.output_key is None:
            self.output_key = list(outputs.keys())[0]

        human_message = inputs[self.input_key]
        ai_message = outputs[self.output_key]

        self.chat_memory.add_user_message(human_message)
        self.chat_memory.add_ai_message(ai_message)


class RAGChatBot:
    def __init__(
        self,
        data_path: str = None,
        mode: str = 'txt',
        model_name: str = None,
        from_huggingface: bool = True,
        gigachat_api_key: Optional[str] = None,
        embeddings_model: str = 'sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2',
        chunk_size: int = 2000,
        chunk_overlap: int = 200,
        k_retriever: int = 5,
        save_path: str = 'vector_store.index'
    ):
        self.data_path = data_path
        self.mode = mode
        self.embeddings_model = embeddings_model
        self.chunk_size = chunk_size
        self.chunk_overlap = chunk_overlap
        self.k_retriever = k_retriever
        self.save_path = save_path

        self.llm = self._get_model(
            model_name=model_name,
            from_huggingface=from_huggingface,
            gigachat_api_key=gigachat_api_key
        )

        self.embeddings = self._get_embeddings()

        self.message_history = []
        self.chat_memory = None
        self.conversation_chain = None

        if self.data_path:
            self.documents = self._load_data()
            self.docs = self._split_data()
            self.vector_store = self._create_vector_store()
            self._initialize_conversation_chain()

    def _initialize_conversation_chain(self):
        retriever = self.vector_store.as_retriever(search_kwargs={'k': self.k_retriever})

        self.chat_memory = EnhancedConversationBufferMemory(
            memory_key='chat_history',
            return_messages=True,
            input_key='question',
            output_key='answer'
        )

        self.conversation_chain = ConversationalRetrievalChain.from_llm(
            llm=self.llm,
            retriever=retriever,
            memory=self.chat_memory,
            return_source_documents=True,
            chain_type='stuff'
        )

    def chat(self, query: str):
        if not self.conversation_chain:
            raise ValueError('Initialize chatbot with documents first')
        result = self.conversation_chain({"question": query})

        return result['answer'], result['source_documents']

    def _load_data(self):
        if self.mode == 'txt':
            loader = TextLoader(self.data_path, autodetect_encoding=True)
        elif self.mode == 'pdf':
            loader = PyPDFLoader(self.data_path)
        else:
            raise ValueError('Mode must be "txt" or "pdf"')

        return loader.load()

    def _split_data(self):
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=self.chunk_size,
            chunk_overlap=self.chunk_overlap,
        )
        return text_splitter.split_documents(self.documents)

    def _get_embeddings(self, retriever: str = None):
        return HuggingFaceEmbeddings(model_name=retriever or self.embeddings_model)

    def _get_model(self, model_name: str = None, from_huggingface: bool = True, gigachat_api_key: str = None):
        if from_huggingface:
            tokenizer = AutoTokenizer.from_pretrained(model_name)
            model = AutoModelForCausalLM.from_pretrained(model_name)
            llm = HuggingFacePipeline(model=model, tokenizer=tokenizer)
        else:
            llm = GigaChat(
                credentials=gigachat_api_key,
                verify_ssl_certs=False
            )

        return llm

    def _create_vector_store(self):
        vector_store = FAISS.from_documents(
            documents=self.docs,
            embedding=self.embeddings
        )
        vector_store.save_local(self.save_path)
        print(f'Vector store saved to {self.save_path}')
        return vector_store

# gigachat_bot = RAGChatBot(
#         data_path='/content/Bulgakov_Mihail_Master_i_Margarita_Readli.Net_bid256_5c1f5.txt',
#         mode='txt',
#         from_huggingface=False,
#         gigachat_api_key='',
#         embeddings_model= 'sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2'
# )

# response = gigachat_bot.chat('question')
