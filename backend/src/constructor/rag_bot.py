from transformers import AutoModelForCausalLM, AutoTokenizer
from langchain.document_loaders import PyPDFLoader, TextLoader, WebBaseLoader
from langchain_community.document_loaders.merge import MergedDataLoader
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain.chat_models.gigachat import GigaChat
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import FAISS
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory
from langchain.llms import HuggingFacePipeline
from typing import List, Union, Dict, Any, Optional
import os


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
        data_sources: List[tuple],
        model_name: str = None,
        from_huggingface: bool = True,
        gigachat_api_key: Optional[str] = None,
        embeddings_model: str = 'sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2',
        chunk_size: int = 2000,
        chunk_overlap: int = 200,
        k_retriever: int = 5,
        save_path: str = 'vector_store.index'
    ):
        self.data_sources = data_sources
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

        if self.data_sources:
            self.documents = self._load_data(self.data_sources)
            self.docs = self._split_data(self.documents)
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
        result = self.conversation_chain({'question': query})

        return result['answer'], result['source_documents']

    def _load_data(self, sources: List[tuple]):
        loaders = []
        for mode, source in sources:
            if mode == 'file':
                if source.lower().endswith('.txt'):
                    loaders.append(TextLoader(source, autodetect_encoding=True))
                elif source.lower().endswith('.pdf'):
                    loaders.append(PyPDFLoader(source))
                else:
                    raise ValueError(f'Unsupported file format: {source}')
            elif mode == "service":
                if source.startswith(('http://', 'https://')):
                    loaders.append(WebBaseLoader(source))
                else:
                    raise ValueError(f'Unsupported URL format: {source}')
            else:
                raise ValueError(f'Unsupported mode: {mode}')

        merged_loader = MergedDataLoader(loaders=loaders)
        return merged_loader.load()

    def _split_data(self, documents):
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=self.chunk_size,
            chunk_overlap=self.chunk_overlap,
        )
        return text_splitter.split_documents(documents)

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
        if os.path.exists(self.save_path):
            print(f'Loading existing vector store from {self.save_path}')
            vector_store = FAISS.load_local(self.save_path, self.embeddings, allow_dangerous_deserialization=True)
        else:
            print(f'Creating new vector store and saving to {self.save_path}')
            vector_store = FAISS.from_documents(
                documents=self.docs,
                embedding=self.embeddings
            )
            vector_store.save_local(self.save_path)
        return vector_store

    def add_sources(self, new_sources: List[tuple]):
        new_documents = self._load_data(new_sources)
        new_docs = self._split_data(new_documents)

        self.vector_store.add_documents(new_docs)
        self.vector_store.save_local(self.save_path)

        self.data_sources.extend(new_sources)
        print(f'Successfully added {len(new_sources)} new sources to the chatbot.')

    def remove_sources(self, sources_to_remove: List[tuple]):
        self.data_sources = [
            source for source in self.data_sources if source not in sources_to_remove
        ]

        self.documents = self._load_data(self.data_sources)
        self.docs = self._split_data(self.documents)

        self.vector_store = FAISS.from_documents(self.docs, self.embeddings)
        self.vector_store.save_local(self.save_path)
        print(f'Successfully removed {len(sources_to_remove)} new sources from the chatbot.')

    def change_model(self, new_model_name: str, from_huggingface: bool = True, gigachat_api_key: Optional[str] = None):
        self.llm = self._get_model(
            model_name=new_model_name,
            from_huggingface=from_huggingface,
            gigachat_api_key=gigachat_api_key
        )
        self._initialize_conversation_chain()
        print(f'Model successfully changed to {new_model_name}.')

    def change_retriever(self, new_embeddings_model: str):
        self.embeddings = self._get_embeddings(retriever=new_embeddings_model)
        self.vector_store = self._create_vector_store()
        self._initialize_conversation_chain()
        print(f'Retriever successfully changed to {new_embeddings_model}.')
