import os
import json
from os.path import join, dirname
from dotenv import load_dotenv
from openai import OpenAI

def load_openai():
    dotenv_path = join(dirname(__file__), '.env')
    load_dotenv(dotenv_path)

    OPEN_API_KEY = os.environ.get("API_KEY")
    print(OPEN_API_KEY)

    return OpenAI(api_key=OPEN_API_KEY)

client = load_openai()

response = client.completions.create(
    model="gpt-3.5-turbo-instruct",
    prompt="What is the OpenAI API?"
)

print(response)
