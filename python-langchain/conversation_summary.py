import os
import json
from langchain_openai import ChatOpenAI
from os.path import join, dirname
from dotenv import load_dotenv
from langchain.memory import ConversationSummaryMemory
from langchain.chains import ConversationChain

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

OPEN_API_KEY = os.environ.get("API_KEY")
print(OPEN_API_KEY)

# Define the LLM
llm = ChatOpenAI(api_key=OPEN_API_KEY)

# Memory
memory = ConversationSummaryMemory(llm=llm)
summary_chain = ConversationChain(llm=llm, memory=memory, verbose=True)

print(json.dumps(summary_chain.invoke("Please summarize the future in 2 sentences."), indent=4))
print(json.dumps(summary_chain.invoke("Why?"), indent=4))
print(json.dumps(summary_chain.invoke("What will i need to shape this?"), indent=4))
