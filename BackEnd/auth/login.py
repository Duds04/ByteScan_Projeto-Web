from auth import auth_bp
from flask import request, jsonify

@auth_bp.route('/login', methods=['POST'])
def login():
    # Lógica do login aqui
    return jsonify({"message": "Login realizado com sucesso"})
