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
llm = ChatOpenAI(api_key=OPEN_API_KEY, temperature=0)

# Functions
@tool
def financial_report(company_name: str, revenue: int, expenses: int) -> str:
    """
        Generate a financial report for a company that calculates net income.
    """
    net_income = revenue - expenses

    report = f"Financial Report for {company_name}:\n"
    report += f"Revenue ${revenue}\n"
    report += f"Expenses ${expenses}\n"
    report += f"Net Income ${net_income}\n"

    return report

# Load tools
# tools = load_tools(["llm-math"], llm=llm)

# Agents: ReAct agent
agent = create_react_agent(llm, [financial_report])

messages = agent.invoke({ 
    "messages": [
        ("human", "TechStack generated made $10 million with $8 million of costs. Generate a financial report")
    ]
})

print(messages)
print("")
print("")
print(messages["messages"][-1].content)

# print(f"tool used: {tools[0].name}")
# print("")
# print(f"tool description: {tools[0].description}")
# print("")
# print(tools[0].func)
