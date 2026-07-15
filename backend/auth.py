from fastapi import APIRouter, HTTPException
from passlib.context import CryptContext
from jose import jwt
from database import users_collection
from models import User



router = APIRouter()

pwd_context = CryptContext(
    schemes=["bcrypt"],

    deprecated="auto"

)



SECRET_KEY = "career_secret_key"

ALGORITHM = "HS256"

# Register API

@router.post("/register")

def register(user: User):


    existing_user = users_collection.find_one(

        {"email": user.email}

    )


    if existing_user:

        raise HTTPException(

            status_code=400,

            detail="Email already registered"

        )



    hashed_password = pwd_context.hash(

        user.password

    )



    users_collection.insert_one({

        "name": user.name,

        "email": user.email,

        "password": hashed_password

    })



    return {


        "message":"User registered successfully"

    }







# Login API

@router.post("/login")

def login(user: User):


    existing_user = users_collection.find_one(

        {"email": user.email}

    )



    if not existing_user:

        raise HTTPException(

            status_code=404,

            detail="User not found"

        )



    if not pwd_context.verify(

        user.password,

        existing_user["password"]

    ):


        raise HTTPException(

            status_code=401,

            detail="Wrong password"

        )



    token = jwt.encode(

        {

        "email":user.email

        },

        SECRET_KEY,

        algorithm=ALGORITHM

    )



    return {


         "success": True,
    "message": "Login successful",
    "token": token,
    "name": existing_user["name"],
    "email": existing_user["email"]

    }