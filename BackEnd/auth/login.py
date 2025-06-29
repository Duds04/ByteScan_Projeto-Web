from auth import auth_bp
from flask import request, jsonify
from database.models import User
from utils.hash import verify_password
from utils.token import generate_token

def autenticar_user(email, password):
    user = User.query.filter_by(email=email).first()
    
    if user and verify_password(user.password, password):
        print("Usuário autenticado com sucesso:", user.username)
        return jsonify({"token": generate_token(user)}), 200

    return jsonify({
        "message": "Senha ou email inválidos",
        "field": "username/email"
    }), 401

@auth_bp.route("/login", methods=["POST"])
def login():
    login_json = request.get_json()
    email = login_json.get("email")
    password = login_json.get("password")
    print("Dados recebidos para login:", login_json)
    
    if not email or not password:
        return jsonify({"message": "Campos obrigatórios não fornecidos"}), 400

    return autenticar_user(email, password)
