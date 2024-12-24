import os
import json
from langchain_openai import ChatOpenAI
from os.path import join, dirname
from dotenv import load_dotenv
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers.string import StrOutputParser

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

OPEN_API_KEY = os.environ.get("API_KEY")
print(OPEN_API_KEY)

# Define the LLM
llm = ChatOpenAI(api_key=OPEN_API_KEY)

destination_prompt = PromptTemplate(
    input_variables=["destination"],
    template="I am planning a trip to {destination}. Can you suggest some activities to do there?"
)

activities_prompt = PromptTemplate(
    input_variables=["activities"],
    template="I only have one day, so can you create an itinerary from your top three activities: {activities}."
)

seq_chain = (
    {"activities": destination_prompt | llm | StrOutputParser()}
    | activities_prompt | llm | StrOutputParser()
)

print(seq_chain.invoke({"destination": "Rome"}))
