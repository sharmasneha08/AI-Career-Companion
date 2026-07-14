from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URL = os.getenv("MONGODB_URI")

client = MongoClient(MONGO_URL)

database = client["career_companion"]

users_collection = database["users"]