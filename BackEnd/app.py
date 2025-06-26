from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from auth.routes import auth_bp
from database.db import db
import os

load_dotenv()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL")
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = os.getenv("SECRET_KEY")

    db.init_app(app)
    CORS(app)
    app.register_blueprint(auth_bp, url_prefix="/api/auth")

    return app