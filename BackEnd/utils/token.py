from flask import request, jsonify
import jwt
import os
from datetime import datetime, timedelta
from functools import wraps

SECRET_KEY = os.getenv("SECRET_KEY", "fallback_secret")

# Gera um token JWT válido
def generate_token(user):
    payload = {
        "sub": user.id,
        "nome": user.nome,
        "username": user.username,
        "email": user.email,
        "exp": datetime.utcnow() + timedelta(days=2)
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
    return token

# Decodifica e valida o token
def decode_token(token):
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        raise ValueError("Token expirado.")
    except jwt.InvalidTokenError:
        raise ValueError("Token inválido.")

# Extrai o token do cabeçalho
def get_token_from_header():
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise ValueError("Token não fornecido ou mal formatado.")
    return auth_header.split()[1]

# Decorator para proteger rotas
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        try:
            token = get_token_from_header()
            user_data = decode_token(token)
        except ValueError as e:
            return jsonify({"message": str(e)}), 401

        request.user_data = user_data  # Você pode acessar isso na view
        return f(*args, **kwargs)
    return decorated

# Autorização baseada no ID do token
def authorize_user(id):
    try:
        token = get_token_from_header()
        user_data = decode_token(token)
        if int(user_data["sub"]) != int(id):
            return jsonify({"message": "Usuário não autorizado."}), 403
    except ValueError as e:
        return jsonify({"message": str(e)}), 401

    user = Users.query.get(id)
    if not user:
        return jsonify({"message": "Usuário não encontrado."}), 404

    return user
