from flask import Blueprint

manga_bp = Blueprint('manga', __name__)

# importa os módulos para registrar as rotas
from manga  import view, favoritos
