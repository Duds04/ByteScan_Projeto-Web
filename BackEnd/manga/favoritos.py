from manga import manga_bp
from flask import Blueprint, request, jsonify
from database.models import Obra, Capitulo, Avaliacao
from database.db_func import get_all, get_id, create_registro
from sqlalchemy import or_, and_
from database.models import Favorito
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

@manga_bp.route("/<int:obra_id>/favorito", methods=["POST"])
@autorizar
def adicionar_favorito(obra_id):
    existente = Favorito.query.filter_by(user_id=request.user_id, obra_id=obra_id).first()
    if existente:
        return jsonify({"message": "Obra já está nos favoritos"}), 400

    novo = Favorito(user_id=request.user_id, obra_id=obra_id)
    db.session.add(novo)
    db.session.commit()

    return jsonify(novo.serialize()), 201

@manga_bp.route("/<int:obra_id>/desfavoritar", methods=["DELETE"])
@autorizar
def remover_favorito(obra_id):
    favorito = Favorito.query.filter_by(user_id=request.user_id, obra_id=obra_id).first()
    if not favorito:
        return jsonify({"message": "Favorito não encontrado"}), 404

    db.session.delete(favorito)
    db.session.commit()
    return jsonify({"message": "Favorito removido com sucesso"}), 200

