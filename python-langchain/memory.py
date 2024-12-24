import os
import json
from langchain_openai import ChatOpenAI
from os.path import join, dirname
from dotenv import load_dotenv
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationChain

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

OPEN_API_KEY = os.environ.get("API_KEY")
print(OPEN_API_KEY)

# Define the LLM
llm = ChatOpenAI(api_key=OPEN_API_KEY)

# Memory
memory = ConversationBufferMemory(size=4)
buffer_chain = ConversationChain(llm=llm, memory=memory)
print(json.dumps(buffer_chain.invoke("Describe a language model in one sentence"), indent=4))
print(json.dumps(buffer_chain.invoke("Describe it again using less words"), indent=4))
print(json.dumps(buffer_chain.invoke("Describe it again fewer words but at least one word"), indent=4))
print(json.dumps(buffer_chain.invoke("What did I first aks you? I forgot."), indent=4))
