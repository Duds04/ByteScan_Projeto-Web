from auth import auth_bp
from flask import request, jsonify

@auth_bp.route('/cadastro', methods=['POST'])
def cadastro():
    # Lógica de cadastro aqui
    return jsonify({"message": "Cadastro realizado com sucesso"})
