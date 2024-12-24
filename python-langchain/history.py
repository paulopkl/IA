import os
import json
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from os.path import join, dirname
from langchain_community.chat_message_histories import ChatMessageHistory

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

OPEN_API_KEY = os.environ.get("API_KEY")
print(OPEN_API_KEY)

# Define the LLM
llm = ChatOpenAI(api_key=OPEN_API_KEY)

# History
history = ChatMessageHistory()
history.add_ai_message("Hi! Ask me anything about LangChain.")
history.add_user_message("Describe a metaphor for learning LangChain in one sentence.")

response = llm.invoke(history.messages)

print()
print(json.dumps(response.response_metadata, indent=4))
print(" ")
print(" ")
print(response.content)
