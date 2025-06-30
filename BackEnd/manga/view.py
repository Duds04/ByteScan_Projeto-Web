from manga import manga_bp
from flask import request, jsonify
from database.models import Manga, Capitulo, Avaliacao, Favorito
from database.db_func import create_registro
from sqlalchemy import or_, func, desc
from utils.categorias import CATEGORIAS_FIXAS, GENEROS_FIXOS
from utils.token import decode_token, get_token_from_header
from utils.token import autorizar

# Rota que filtra mangas por genero e tipo
@manga_bp.route("/filtro", methods=["GET"])
def filtro():
    tipo = request.args.get("categoria")
    genero = request.args.get("genero")

    query = Manga.query

    if genero:
        query = query.filter(Manga.genero.ilike(f"%{genero}%"))
    if tipo:
        query = query.filter(Manga.tipo.ilike(f"%{tipo}%"))

    mangas = query.all()
    return jsonify([m.serialize() for m in mangas]), 200

# Rota que pesquisa mangas por termo nome ou descrição
@manga_bp.route("/pesquisa", methods=["GET"])
def pesquisa():
    termo = request.args.get("termo")
    if not termo:
        return jsonify({"message": "Parâmetro de busca 'termo' é obrigatório"}), 400

    resultados = Manga.query.filter(
        or_(
            Manga.nome.ilike(f"%{termo}%"),
            Manga.descricao.ilike(f"%{termo}%")
        )
    ).all()

    return jsonify([m.serialize() for m in resultados]), 200

# Rota que lista mangas com seus capítulos, sem imagens apenas com a capa ordem decescente
@manga_bp.route("/obras/<int:manga_id>/capitulos", methods=["GET", "OPTIONS"])
def listar_capitulos_sem_imagens(manga_id):
    manga = Manga.query.get(manga_id)
    if not manga:
        return jsonify({"message": "Mangá não encontrado"}), 404

    capitulos = Capitulo.query.filter_by(manga_id=manga_id).order_by(Capitulo.data_postagem.desc()).all()

    capitulos_serializados = [
        {
            "idCap": c.id,
            "numero": c.numero,
            "capitulo": c.titulo,
            "data_postagem": c.data_postagem.strftime("%d/%m/%Y")
        }
        for c in capitulos
    ]

    return jsonify({
        "id": manga.id,
        "nome": manga.nome,
        "imagemCapa": manga.imagemCapa,
        "capitulos": capitulos_serializados
    }), 200


@manga_bp.route("/obras/mais-favoritados", methods=["GET"])
def listar_mangas_mais_favoritados():
    # Faz um join com Favorito e conta quantos favoritos cada mangá tem
    mangas = (
        Manga.query
        .outerjoin(Favorito, Manga.id == Favorito.manga_id)
        .group_by(Manga.id)
        .order_by(desc(func.count(Favorito.id)))
        .all()
    )
    return jsonify([m.serialize() for m in mangas]), 200

# Rota que retorna o capítulo específico de um manga, com imagens
@manga_bp.route("/<int:manga_id>/capitulo/<int:num>", methods=["GET", "OPTIONS"])
def get_capitulo(manga_id, num):
    capitulo = Capitulo.query.filter_by(manga_id=manga_id, numero=num).first()
    if not capitulo:
        return jsonify({"message": "Capítulo não encontrado"}), 404

    return jsonify({
        "idManga": manga_id,
        "idCap": capitulo.id,
        "data": capitulo.data_postagem.strftime("%d/%m/%Y"),
        "capitulo": capitulo.titulo,
        "imagensCapitulo": capitulo.imagens  # mudou de pdf_url para imagens (lista)
    }), 200

# Rota que lista todas as obras
@manga_bp.route("/obras", methods=["GET", "OPTIONS"])
def listar_mangas():
    mangas = Manga.query.all()
    return jsonify([m.serialize() for m in mangas]), 200

# Rota que retorna uma obra específica
@manga_bp.route("/obras/<int:manga_id>", methods=["GET", "OPTIONS"])
def get_manga_completo(manga_id):
    manga = Manga.query.get(manga_id)
    if not manga:
        return jsonify({"message": "Obra não encontrada"}), 404

    favoritado = False
    avaliacao = 0

    try:
        token = get_token_from_header()
        user_data = decode_token(token)
        user_id = user_data.get("user_id")

        favorito = Favorito.query.filter_by(user_id=user_id, manga_id=manga_id).first()
        favoritado = favorito is not None

        avaliacao_obj = Avaliacao.query.filter_by(user_id=user_id, manga_id=manga_id).first()
        if avaliacao_obj:
            avaliacao = avaliacao_obj.serialize()

    except Exception:
        pass
    
    if not avaliacao:
        avaliacao = 0
        
    return jsonify({
        "manga": manga.serialize(),
        "favoritado": favoritado,
        "avaliacao": avaliacao
    }), 200




@manga_bp.route("/categorias", methods=["GET"])
def get_categorias():
    return jsonify(CATEGORIAS_FIXAS), 200


@manga_bp.route("/generos", methods=["GET"])
def get_generos():
    return jsonify(GENEROS_FIXOS), 200


@manga_bp.route("/<int:manga_id>/capitulo", methods=["POST"])
def adicionar_capitulo(manga_id):
    dados = request.get_json()

    if not dados.get("numero") or not dados.get("titulo") or not dados.get("imagens"):
        return jsonify({"message": "Campos obrigatórios: numero, titulo, imagens"}), 400

    dados["manga_id"] = manga_id
    return create_registro(Capitulo, dados)
