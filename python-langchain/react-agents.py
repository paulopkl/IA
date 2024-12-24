import os
import json
from langchain_openai import ChatOpenAI
from os.path import join, dirname
from dotenv import load_dotenv
from langgraph.prebuilt import create_react_agent
from langchain_community.agent_toolkits.load_tools import load_tools
from langchain_core.tools import tool

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

OPEN_API_KEY = os.environ.get("API_KEY")
print(OPEN_API_KEY)

# Define the LLM
llm = ChatOpenAI(api_key=OPEN_API_KEY)

# Load tools
tools = load_tools(["llm-math"], llm=llm)

# Agents
agent = create_react_agent(llm, tools)

messages = agent.invoke({ 
    "messages": [
        ("human", "What is the square root of 101?")
    ]
})

print(messages)

# print(f"tool used: {tools[0].name}")
# print("")
# print(f"tool description: {tools[0].description}")
# print("")
# print(tools[0].func)
