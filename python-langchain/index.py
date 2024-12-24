import os
import json
from os.path import join, dirname
from dotenv import load_dotenv
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_chroma import Chroma
from langchain_core.runnables import RunnablePassthrough
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_core.prompts import ChatPromptTemplate

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

OPEN_API_KEY = os.environ.get("API_KEY")
print(OPEN_API_KEY)

chunk_size = 300
chunk_overlap = 50

DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(DIR, 'langchain_chroma_data')

# Load Openai Embedding
embedding_function = OpenAIEmbeddings(api_key=OPEN_API_KEY)

# Load Openai LLM
llm = ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0, api_key=OPEN_API_KEY)

# Load PDF document
loader = PyPDFLoader("neuralnetwork.pdf")
data = loader.load()

# Split the document using RecursiveCharacterTextSplitter
splitter = RecursiveCharacterTextSplitter(
    separators=["\n\n", "\n", " ", ""],
    chunk_size=chunk_size,
    chunk_overlap=chunk_overlap
)

# Split PDF Document
docs = splitter.split_documents(data)

# Save Data of PDF to Database
vector_store = Chroma.from_documents(
    docs,
    embedding=embedding_function,
    persist_directory=DB_PATH
)

# Retrieve document from Vector Database
retriever = vector_store.as_retriever(
    search_type="similarity",
    search_kwargs={"k": 3}
)

message = """
    Review and fix the following TechStack marketing copy with the following guidelines in consideration:

    Guidelines:
    {guidelines}

    Copy:
    {copy}

    Fixed Copy:
"""

prompt_template = ChatPromptTemplate.from_messages([
    ("human", message)
])

rag_chain = (
    {"guidelines": retriever, "copy": RunnablePassthrough()} 
    | prompt_template
    | llm
)

response = rag_chain.invoke("Here at TechStack, our users are the best in the world!")

print(response.content)
