# database/db_func.py

from flask import jsonify
from database.db import db

# Busca um registro com base em uma condição
def get_registro(model, condition):
    try:
        return model.query.filter(condition).first()
    except Exception as e:
        print(f"Erro: {e}")
        return None

# Retorna todos os registros de uma tabela.
def get_all(model):
    try:
        registros = model.query.all()
        return jsonify([r.serialize() for r in registros]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Retorna um registro específico pelo ID.
def get_id(model, id):
    try:
        registro = model.query.get(id)
        if not registro:
            return jsonify({"message": f"{model.__name__} não encontrado"}), 404
        return jsonify(registro.serialize()), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Cria um novo registro.
def create_registro(model, data):
    try:
        registro = model(**data)
        db.session.add(registro)
        db.session.commit()
        return jsonify({"message": f"{model.__name__} criado com sucesso", "id": registro.id}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400


# Remove um registro pelo ID.
def delete_registro(model, id):
    try:
        registro = model.query.get(id)
        if not registro:
            return jsonify({"message": f"{model.__name__} não encontrado"}), 404
        db.session.delete(registro)
        db.session.commit()
        return jsonify({"message": f"{model.__name__} removido com sucesso"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
