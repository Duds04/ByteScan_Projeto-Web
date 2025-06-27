from flask import Blueprint

auth_bp = Blueprint("auth", __name__)

# importa os módulos para registrar as rotas
from auth import login, cadastro  