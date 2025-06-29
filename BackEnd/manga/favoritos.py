from manga import manga_bp
from flask import request, jsonify
from database.models import Manga, Capitulo, Avaliacao, Favorito
from database.db_func import get_all, get_id, create_registro
from sqlalchemy import or_, and_
from utils.token import autorizar
from database.db import db
from utils.categorias import CATEGORIAS_FIXAS, GENEROS_FIXOS
from flask import send_file
import os

@manga_bp.route("/favoritos", methods=["GET"])
@autorizar
def listar_favoritos():
    favoritos = Favorito.query.filter_by(user_id=request.user_id).all()
    return jsonify([fav.serialize() for fav in favoritos]), 200

@manga_bp.route("/<int:manga_id>/favorito", methods=["POST"])
@autorizar
def adicionar_favorito(manga_id):
    existente = Favorito.query.filter_by(user_id=request.user_id, manga_id=manga_id).first()
    if existente:
        return jsonify({"message": "Mangá já está nos favoritos"}), 400

    novo = Favorito(user_id=request.user_id, manga_id=manga_id)
    db.session.add(novo)
    db.session.commit()

    return jsonify(novo.serialize()), 201

@manga_bp.route("/<int:manga_id>/desfavoritar", methods=["DELETE"])
@autorizar
def remover_favorito(manga_id):
    favorito = Favorito.query.filter_by(user_id=request.user_id, manga_id=manga_id).first()
    if not favorito:
        return jsonify({"message": "Favorito não encontrado"}), 404

    db.session.delete(favorito)
    db.session.commit()
    return jsonify({"message": "Favorito removido com sucesso"}), 200
