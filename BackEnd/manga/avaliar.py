from manga import manga_bp
from flask import request, jsonify
from database.models import Avaliacao
from database.db_func import create_registro
from sqlalchemy import or_, func, desc
from utils.token import autorizar

# Rota que avalia um manga
@manga_bp.route("/<int:manga_id>/avaliar", methods=["POST"])
@autorizar
def avaliar_manga(manga_id):
    print("Teste")
    dados = request.get_json()
    print("TTeste")
    user_id = request.user_id
    nota = dados.get("nota")
    comentario = dados.get("comentario", "")

    if not user_id or nota is None:
        return jsonify({"message": "user_id e nota são obrigatórios"}), 400

    nova_avaliacao = {
        "user_id": user_id,
        "manga_id": manga_id,
        "nota": nota,
        "comentario": comentario
    }

    return create_registro(Avaliacao, nova_avaliacao)

@manga_bp.route("/<int:manga_id>/avaliacoes", methods=["GET"])
def get_avaliacoes_manga(manga_id):
    nota_media = Avaliacao.query.with_entities(func.avg(Avaliacao.nota)).filter_by(manga_id=manga_id).scalar()
    nota_media = round(nota_media, 2) if nota_media is not None else 0.0
    return jsonify({"nota": nota_media}), 200
