from flask import Blueprint, request, jsonify
from database.models import User
from utils.hash import verify_password
from utils.token import generate_token, protected

login_bp = Blueprint("login", __name__, url_prefix="/login")

def autenticar_user(email, password):
    user = User.query.filter_by(email=email).first()

    if user and verify_password(user.password, password):
        return generate_token(user), 200
    return jsonify({
        "message": "Senha ou email inválidos",
        "field": "username/email"
    }), 401

@login_bp.route("/", methods=["POST"])
def login():
    login_json = request.get_json()
    email = login_json.get("email")
    password = login_json.get("password")

    if not email or not password:
        return jsonify({"message": "Campos obrigatórios não fornecidos"}), 400

    return autenticar_user(email, password)

@login_bp.route("/protected", methods=["GET"])
def proteger():
    return protected()
