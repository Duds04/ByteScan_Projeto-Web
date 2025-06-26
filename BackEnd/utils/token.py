from flask import jsonify, abort, request
import jwt
import datetime
from ciw_backend.models import Users


SECRET_KEY = "my_secret"

def generate_token(user):
    
    
    payload = {
        "sub": user.id,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(days=2),
        'nome': user.nome,
        'username': user.username,
        'email': user.email
    }
    
    token = jwt.encode(payload, "my_secret", algorithm="HS256")
    
    return jsonify({"token": token})

def decode_token():
    auth_header = request.headers.get('Authorization')
    
    if not auth_header:
        return None, "Token não fornecido", 401

    try:
        token = auth_header.split()[1]
        
    except IndexError:
        return jsonify({"message": "Formato do token inválido"}), 401
    
    try:
        decoded_payload = jwt.decode(token, "my_secret", algorithms="HS256")
        return decoded_payload, None, 200
    
    except jwt.ExpiredSignatureError:
        return None, "Token expirado. Faça login novamente.", 401
    
    except jwt.InvalidTokenError:
        return None, "Token inválido. Verifique suas credenciais.", 401

def protected():
    decoded_payload, error_message, status_code = decode_token()
    
    if status_code != 200:
        return jsonify({"message": error_message}), status_code

    return jsonify({"message": "Acesso permitido", "sub": decoded_payload["sub"]}), status_code

def autorization(id):
    user = Users.query.get(id)
    
    if user is None:
        return jsonify({"message": 'Usuário não encontrado',
                        'field': 'User'}), 404
    
    response, status_code = protected()
    response_JSON = response.json

    if status_code != 200:
        return jsonify({"message": "Token inválido",
                        'field': 'token'}), 401

    if response_JSON['sub'] != int(id):
        return jsonify({"message": "Usuário não autorizado",
                        'field': 'id'}), 403

    return user, 200

