
from langchain_community.document_loaders import CSVLoader

loader = CSVLoader("List_of_countries_by_GDP.csv")

data = loader.load()

print(data)
