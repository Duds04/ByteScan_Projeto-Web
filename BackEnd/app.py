from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os
from database.db import db 

# Carrega variáveis de ambiente
load_dotenv()

# Importa os blueprints
from auth import auth_bp
from manga import manga_bp

# Dicionário com as blueprints principais e seus prefixos
blueprints = {
    auth_bp: "/api/auth",
    manga_bp: "/api/manga"
}

def create_app():
    app = Flask(__name__)
    
    # Configurações principais
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL")
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = os.getenv("SECRET_KEY")

    db.init_app(app)
    CORS(app)

    # Registra todas as blueprints
    for bp, prefix in blueprints.items():
        app.register_blueprint(bp, url_prefix=prefix)

    return app
