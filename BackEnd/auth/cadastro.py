from auth import auth_bp
from flask import request, jsonify
from database.models import User
from utils.hash import hash_password
from database.db_func import create_registro, get_registro
from auth.login import autenticar_user

@auth_bp.route('/cadastro', methods=['POST'])
def cadastro():
    dados = request.get_json()

    username = dados.get("username")
    nome = dados.get("nome")
    email = dados.get("email")
    password = dados.get("password")

    
    # Validação básica
    if not username or not email or not password or not nome:
        return jsonify({"message": "Todos os campos sao obrigatorios"}), 400

    # Verifica se o usuário já existe (username ou email)
    existente = get_registro(User, (User.username == username) | (User.email == email))
    if existente:
        return jsonify({"message": "Usuario ou email ja cadastrado"}), 409

    # Dados para o novo registro
    data = {
        "username": username,
        "email": email,
        "nome": nome,
        "password": hash_password(password)
    }
    print("Dados recebidos para cadastro:", data)
    msg, status = create_registro(User, data)

    if status == 201:
        return autenticar_user(email, password)
    
    return jsonify(msg), status
