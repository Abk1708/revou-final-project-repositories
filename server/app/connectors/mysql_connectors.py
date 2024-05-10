from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os

username = os.getenv('DB_USERNAME')
password = os.getenv('DB_PASSWORD')
host = os.getenv('DB_HOST')
database = os.getenv('DB_NAME')

print('Connecting to MySQL Database')
engine = create_engine(f'mysql+mysqlconnector://{username}:{password}@{host}/{database}')

connection = engine_connect()
Session = sessionmaker(connection)
print(f'Connected to the MySQL Database at {host}')