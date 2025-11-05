from secrets import token_hex
import dotenv
from flask_sqlalchemy import SQLAlchemy

db : SQLAlchemy = SQLAlchemy()

class Config:
    SQLALCHEMY_DATABASE_URI = dotenv.get_key(dotenv.find_dotenv(), "DATABASE_URL")
    
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    SECRET_KEY = token_hex(32)
