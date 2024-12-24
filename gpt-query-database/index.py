import os
import getpass
import urllib
from dotenv import load_dotenv

## Langchain
from langchain.chains.sql_database.query import create_sql_query_chain
from langchain_community.utilities.sql_database import SQLDatabase
from langchain_openai import ChatOpenAI

from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate

## SQL
from sqlalchemy import create_engine

load_dotenv(".env")

if "OPENAI_API_KEY" not in os.environ:
    os.environ["OPENAI_API_KEY"] = getpass.getpass("Enter your OpenAI API key: ")

gptModel = "gpt-4o-mini" # "gpt-3.5-turbo"

# Initialize the language model
llm = ChatOpenAI(
    api_key=os.environ["OPENAI_API_KEY"],
    model=gptModel
)

sqlServerUsername = os.getenv("SQL_SERVER_USERNAME")
sqlServerPassword = urllib.parse.quote_plus(os.getenv("SQL_SERVER_PASSWORD"))
sqlServerHost = f"{os.getenv("SQL_SERVER_HOST")}:{os.getenv("SQL_SERVER_PORT")}"
sqlServerDatabase = os.getenv("SQL_SERVER_DATABASE")

# Define the connection string for SQL Server
connectionString = f"mssql+pyodbc://{sqlServerUsername}:{sqlServerPassword}@{sqlServerHost}/{sqlServerDatabase}?driver=ODBC+Driver+17+for+SQL+Server&TrustServerCertificate=yes"

print(connectionString)

# Create the SQLAlchemy engine
engine = create_engine(connectionString, isolation_level="AUTOCOMMIT")

# Initialize the SQLDatabase with the engine
db = SQLDatabase(engine)

# Create the SQL query chain
queryChain = create_sql_query_chain(
    llm=llm,
    db=db,
)

## PROMPT
promptValidator = """
You are a {dialect} expert. Given an input question, create a syntactically correct {dialect} query to run.
Pay attention to use date('now') function to get the current date, if the question involves "today".

Write an initial draft of the query. Then double check the {dialect} query for common mistakes, including:
- Using NOT IN with NULL values
- Using UNION when UNION ALL should have been used
- Using BETWEEN for exclusive ranges
- Data type mismatch in predicates
- Properly quoting identifiers
- Using the correct number of arguments for functions
- Casting to the correct data type
- Using the proper columns for joins
- Validate all GROUP BY clauses
- if output is a datetime convert in format 'YYYY-MM-DD hh:mm:ss'
- PAY ATTENTION: if output contains ```sql ... ``` remove this preserving content

If there are any of the above mistakes, rewrite the query.
If there are no mistakes, just reproduce the original query with no further commentary.

Output the final SQL query only."""

prompt = ChatPromptTemplate.from_messages([
    ("system", promptValidator), 
    ("human", "{query}")
]).partial(dialect=db.dialect)

validation_chain = prompt | llm | StrOutputParser()

full_chain = {"query": queryChain} | validation_chain

# Execute a query
# result = full_chain.invoke({"question": "How many employees are there?"})
# result = full_chain.invoke({"question": "Who is the oldest employee?"})
# result = full_chain.invoke({"question": "Which company has more employees, show me how many?"})
# result = full_chain.invoke({"question": "Which company has more employees? list the name of these employee"})
# result = full_chain.invoke({"question": "Join the name of all companies with ',' between"})
# result = full_chain.invoke({"question": "Create a table named days, with an ID being uuid, name beign day name of week and a weeknumber being the day number of week"})
# result = full_chain.invoke({"question": "Using table days, insert every day of week"})
# result = full_chain.invoke({"question": "Create a login named paulo, a user paulo for that login and give administrador permission to paulo for the table that is not of sql server"})
# result = full_chain.invoke({"question": "Create a table Mock, with three random columns as you wish"})
# result = full_chain.invoke({"question": "Delete the table Mock"})
result = full_chain.invoke({"question": "Make a backup of the database db_test location is /var/opt/mssql/backups/db_test.bak"}) ## IT DOESN'T WORK
# result = full_chain.invoke({"question": "Show me all users that are logged, use table sys of master if necessary"}) ## IT DOESN'T WORK
# result = full_chain.invoke({"question": "Who is the newest employee?"})
# result = full_chain.invoke({"question": "show all the total number of employees of each company"})
# result = full_chain.invoke({"question": "What time is now?"})
# result = full_chain.invoke({"question": "What is the timezone of database?"})
# result = full_chain.invoke({"question": "Create database db_test_bkp!"})

print("\n" + result + "\n")

queryResult = db.run(result)
print(queryResult)
