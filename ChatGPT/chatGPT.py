import tiktoken
import os
import openai

def calculate_tokens(string, enconding_name):
    enconding = tiktoken.get_encoding(enconding_name)
    num_tokens = len(enconding.encode(string))
    return num_tokens

phrase = "Quais são os cursos da Full Cycle?"
qtd_tokens = calculate_tokens(phrase, "cl100k_base")
# print(qtd_tokens)

def do_completion(prompt):
    openai.api_key = os.environ.get("API_KEY")
    response = openai.Completion.create(
        prompt=prompt,
        max_tokens=200,
        model="text-davinci-003"
    )
    # print(response)
    return response["choices"][0]["text"]

res = do_completion(phrase)
print(res)
