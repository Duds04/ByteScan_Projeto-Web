from manga import manga_bp
from flask import request, jsonify
from database.models import Manga, Favorito
from utils.token import autorizar
from database.db import db

@manga_bp.route("/favoritos", methods=["GET"])
@autorizar
def listar_favoritos():
    favoritos = Favorito.query.filter_by(user_id=request.user_id).all()
    return jsonify([fav.manga.serialize() for fav in favoritos if fav.manga]), 200

@manga_bp.route("/favoritos/<int:obra_id>", methods=["GET"])
@autorizar
def get_favorito(obra_id):
    print(f"Verificando favorito para obra_id: {obra_id} e user_id: {request.user_id}")
    favorito = Favorito.query.filter_by(user_id=request.user_id, manga_id=obra_id).first()
    if not favorito:
        return jsonify({"favoritado": False}), 200

    return jsonify({"favoritado": True}), 200

@manga_bp.route("/favorito/<int:manga_id>", methods=["POST"])
@autorizar
def add_favorito(manga_id):
    existente = Favorito.query.filter_by(user_id=request.user_id, manga_id=manga_id).first()
    if existente:
        return jsonify({"message": "Mangá já está nos favoritos"}), 400

    manga = Manga.query.get(manga_id)
    if not manga:
        return jsonify({"message": "Mangá não encontrado"}), 404

    novo = Favorito(user_id=request.user_id, manga_id=manga_id)
    db.session.add(novo)
    
    db.session.commit()

    return jsonify(novo.serialize()), 200

@manga_bp.route("/desfavoritar/<int:manga_id>", methods=["DELETE"])
@autorizar
def remover_favorito(manga_id):
    favorito = Favorito.query.filter_by(user_id=request.user_id, manga_id=manga_id).first()
    if not favorito:
        return jsonify({"message": "Favorito não encontrado"}), 404

    db.session.delete(favorito)
    db.session.commit()
    return jsonify({"message": "Favorito removido com sucesso"}), 200
