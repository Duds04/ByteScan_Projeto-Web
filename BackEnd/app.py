from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

# Importa os blueprints
from auth import auth_bp

blueprints = {
        auth_bp: "/api/auth",
    }

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL")
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = os.getenv("SECRET_KEY")

    CORS(app)
    # db.init_app(app)  # se usar banco

    # Dicionário com blueprint e prefixo
    

    # Registra todas as blueprints do dicionário
    for bp, prefix in blueprints.items():
        app.register_blueprint(bp, url_prefix=prefix)

    return app
