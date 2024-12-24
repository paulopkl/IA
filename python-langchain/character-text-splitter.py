from langchain_community.document_loaders import CSVLoader, UnstructuredHTMLLoader
from langchain.text_splitter import CharacterTextSplitter, RecursiveCharacterTextSplitter

chunk_size = 24
chunk_overlap = 3

loader = UnstructuredHTMLLoader("index.html")
data = loader.load()

# ct_splitter = CharacterTextSplitter(
#     separator=".",
#     chunk_size=chunk_size,
#     chunk_overlap=chunk_overlap
# )

rc_splitter = RecursiveCharacterTextSplitter(
    separators=["."],
    chunk_size=chunk_size,
    chunk_overlap=chunk_overlap
)

docs = rc_splitter.split_documents(data)

# print(data[0].page_content)
print(docs)
# print([len(docs) for doc in docs])

