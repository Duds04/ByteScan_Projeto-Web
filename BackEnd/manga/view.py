from manga import manga_bp
from flask import Blueprint, request, jsonify
from database.models import Obra, Capitulo, Avaliacao
from database.db_func import get_all, get_id, create_registro
from sqlalchemy import or_, and_

# Navegação por categorias ou gênero     
@manga_bp.route("/filtro", methods=["GET"])
def filtro():
    categoria = request.args.get("categoria")
    genero = request.args.get("genero")

    query = Obra.query
    
    print("Categoria = ", categoria)
    print("Genero = ", genero)
    
    if categoria:
        query = query.filter_by(categoria=categoria)
    if genero:
        query = query.filter_by(genero=genero)

    obras = query.all()
    return jsonify([obra.serialize() for obra in obras]), 200

# Sistema de Pesquisa
@manga_bp.route("/pesquisa", methods=["GET"])
def pesquisa():
    termo = request.args.get("termo")
    if not termo:
        return jsonify({"message": "Parâmetro de busca 'termo' é obrigatório"}), 400

    resultados = Obra.query.filter(
        or_(
            Obra.titulo.ilike(f"%{termo}%"),
            Obra.descricao.ilike(f"%{termo}%")
        )
    ).all()

    return jsonify([obra.serialize() for obra in resultados]), 200

# # Leitura online (retorna URL do PDF do capítulo)
# @manga_bp.route("/<int:obra_id>/capitulo/<int:num>", methods=["GET"])
# def leitura_online(obra_id, num):
#     capitulo = Capitulo.query.filter_by(obra_id=obra_id, numero=num).first()
#     if not capitulo:
#         return jsonify({"message": "Capítulo não encontrado"}), 404
#     return jsonify({
#         "numero": capitulo.numero,
#         "titulo": capitulo.titulo,
#         "pdf_url": capitulo.pdf_url
#     }), 200

# Avaliação de obras
@manga_bp.route("/<int:obra_id>/avaliar", methods=["POST"])
def avaliar_obra(obra_id):
    dados = request.get_json()
    user_id = dados.get("user_id")
    nota = dados.get("nota")
    comentario = dados.get("comentario", "")

    if not user_id or not nota:
        return jsonify({"message": "user_id e nota são obrigatórios"}), 400

    nova_avaliacao = {
        "user_id": user_id,
        "obra_id": obra_id,
        "nota": nota,
        "comentario": comentario
    }

    return create_registro(Avaliacao, nova_avaliacao)
