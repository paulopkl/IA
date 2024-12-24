from langchain_community.document_loaders import UnstructuredHTMLLoader

loader = UnstructuredHTMLLoader("index.html")

data = loader.load()

print(data)
