from manga import manga_bp
from flask import Blueprint, request, jsonify, send_file
from database.models import Obra, Capitulo, Avaliacao
from database.db_func import get_all, get_id, create_registro
from sqlalchemy import or_, and_
from utils.categorias import CATEGORIAS_FIXAS, GENEROS_FIXOS
from database.models import Favorito
from utils.token import decode_token, get_token_from_header
import os


# TODO: fazer o GET das categorias e generos, sendo fixos ou algo assim

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

# TODO: fazer a leitura

# Leitura online (retorna PDF do capítulo)
@manga_bp.route("/<int:obra_id>/capitulo/<int:num>", methods=["GET"])
def leitura_online(obra_id, num):
    capitulo = Capitulo.query.filter_by(obra_id=obra_id, numero=num).first()
    if not capitulo:
        return jsonify({"message": "Capítulo não encontrado"}), 404

    return jsonify({
        "numero": capitulo.numero,
        "titulo": capitulo.titulo,
        "pdf_url": capitulo.pdf_url
    }), 200


@manga_bp.route("/obras", methods=["GET"])
def listar_obras():
    obras = Obra.query.all()
    return jsonify([obra.serialize() for obra in obras]), 200

# TODO: fazer o get das avaliaçoes de um manga

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

@manga_bp.route("/obras/<int:obra_id>", methods=["GET"])
def get_obra_completa(obra_id):
    obra = Obra.query.get(obra_id)
    if not obra:
        return jsonify({"message": "Obra não encontrada"}), 404

    favoritado = False
    avaliacao = None

    # Tenta extrair o token, se houver
    try:
        token = get_token_from_header()
        user_data = decode_token(token)
        user_id = user_data.get("user_id")

        # Verifica se a obra está favoritada
        favorito = Favorito.query.filter_by(user_id=user_id, obra_id=obra_id).first()
        favoritado = favorito is not None

        # Verifica se o usuário avaliou a obra
        avaliacao_obj = Avaliacao.query.filter_by(user_id=user_id, obra_id=obra_id).first()
        if avaliacao_obj:
            avaliacao = avaliacao_obj.serialize()

    except Exception:
        # Usuário não está logado ou token inválido – mantemos valores padrão
        pass

    return jsonify({
        "obra": obra.serialize(),
        "favoritado": favoritado,
        "avaliacao": avaliacao
    }), 200


# GET das avaliações de uma obra
@manga_bp.route("/<int:obra_id>/avaliacoes", methods=["GET"])
def get_avaliacoes_obra(obra_id):
    avaliacoes = Avaliacao.query.filter_by(obra_id=obra_id).all()
    return jsonify([a.serialize() for a in avaliacoes]), 200


@manga_bp.route("/categorias", methods=["GET"])
def get_categorias():
    return jsonify(CATEGORIAS_FIXAS), 200

@manga_bp.route("/generos", methods=["GET"])
def get_generos():
    return jsonify(GENEROS_FIXOS), 200


@manga_bp.route("/<int:obra_id>/capitulo", methods=["POST"])
def adicionar_capitulo(obra_id):
    dados = request.get_json()

    if not dados.get("numero") or not dados.get("titulo") or not dados.get("pdf_url"):
        return jsonify({"message": "Campos obrigatórios: numero, titulo, pdf_url"}), 400

    dados["obra_id"] = obra_id
    return create_registro(Capitulo, dados)