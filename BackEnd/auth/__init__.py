from flask import Blueprint

auth_bp = Blueprint("auth", __name__)

from auth import login, cadastro  # Garante que rotas sejam registradas
