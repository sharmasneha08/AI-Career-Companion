from pymongo import MongoClient
import os
from dotenv import load_dotenv


load_dotenv()


MONGO_URL = os.getenv(
    "MONGO_URL"
)


client = MongoClient(MONGO_URL)


database = client["AI_Career_Companion"]


users_collection = database["users"]