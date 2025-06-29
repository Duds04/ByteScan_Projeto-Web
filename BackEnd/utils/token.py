from flask import request, jsonify
from functools import wraps
from datetime import datetime, timedelta
import jwt
import os
from database.models import User

JWT_SECRET = os.getenv("JWT_SECRET", "fallback_jwt_secret")

# Gera token JWT
def generate_token(user):
    payload = {
        "user_id": user.id,
        "nome": user.nome,
        "username": user.username,
        "email": user.email,
        "exp": datetime.utcnow() + timedelta(days=2)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm="HS256")

# Decodifica token
def decode_token(token):
    try:
        return jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        raise ValueError("Token expirado.")
    except jwt.InvalidTokenError:
        raise ValueError("Token inválido.")

# Extrai token do cabeçalho Authorization
def get_token_from_header():
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise ValueError("Token não fornecido ou mal formatado.")
    return auth_header.split(" ")[1]

# Decorador de proteção de rota
def autorizar(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        try:
            token = get_token_from_header()
            decoded = decode_token(token)
            request.user_data = decoded  # Informações completas do usuário
            request.user_id = decoded.get("user_id")  # ID rápido
        except ValueError as e:
            return jsonify({"message": str(e)}), 401
        return f(*args, **kwargs)
    return decorated

# Verifica se o ID do token corresponde ao recurso acessado
def authorize_user(id):
    try:
        token = get_token_from_header()
        decoded = decode_token(token)
        if int(decoded.get("user_id")) != int(id):
            return jsonify({"message": "Usuário não autorizado."}), 403
    except ValueError as e:
        return jsonify({"message": str(e)}), 401

    user = User.query.get(id)
    if not user:
        return jsonify({"message": "Usuário não encontrado."}), 404

    return user
