import os
import json
from langchain_openai import ChatOpenAI
from os.path import join, dirname
from dotenv import load_dotenv
from langgraph.prebuilt import create_react_agent
from langchain_community.document_loaders import PyPDFLoader, CSVLoader, UnstructuredHTMLLoader

loader = PyPDFLoader("neuralnetwork.pdf")
# loader = CSVLoader("List_of_countries_by_GDP.csv")
# loader = UnstructuredHTMLLoader("index.html")

data = loader.load()

# print(data[0].page_content)
print(data)
