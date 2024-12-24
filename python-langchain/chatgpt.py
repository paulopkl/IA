import os
import json
from langchain_openai import OpenAI, ChatOpenAI
from os.path import join, dirname
from dotenv import load_dotenv
# from langchain_community.llms import HuggingFaceHub
from langchain_core.prompts import ChatPromptTemplate
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationChain

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

OPEN_API_KEY = os.environ.get("API_KEY")
print(OPEN_API_KEY)

# Define the LLM
# llm = OpenAI(model_name="gpt-3.5-turbo-instruct", openai_api_key=OPEN_API_KEY)
# llm = HuggingFaceHub(repo_id="", huggingfacehub_api_token=)
llm = ChatOpenAI(api_key=OPEN_API_KEY)

# History
# history = ChatMessageHistory()
# history.add_ai_message("Hi! Ask me anything about LangChain.")
# history.add_user_message("Describe a metaphor for learning LangChain in one sentence.")

# Memory
memory = ConversationBufferMemory(size=4)
buffer_chain = ConversationChain(llm=llm, memory=memory)
buffer_chain.invoke("Describe a language model in one sentence")
buffer_chain.invoke("Describe it again using less words")
buffer_chain.invoke("Describe it again fewer words but at least one word")
buffer_chain.invoke("What did I first aks you? I forgot.")

# Prompts
# prompt_template = ChatPromptTemplate.from_messages(
#     [
#         ("system", "You are soto zen master Rushi"),
#         ("human", "What is the essence of Zen?"),
#         ("ai", "When you are hungry, eat. When you are tired, sleep."),
#         ("human", "Respond to the question: {question}"),
#     ]
# )

# Chains
# llm_chain = prompt_template | llm

# Predict the words following the text in question
# question = 'What is the sound of one hand clapping?'

# response = llm_chain.invoke({"question": question})
# response = llm.invoke(history.messages)
# response = llm

print()
# print(json.dumps(response.response_metadata, indent=4))
print(" ")
print(" ")
# print(response.content)
