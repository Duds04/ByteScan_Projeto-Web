from manga import manga_bp
from flask import request, jsonify

@manga_bp.route('/manga/registro', methods=['POST'])
def registro():
    # Lógica de cadastro aqui
    return jsonify({"message": "Cadastro realizado com sucesso"})

@manga_bp.route('/manga/atualizar', methods=['POST'])
def registro():
    # Lógica de cadastro aqui
    return jsonify({"message": "Cadastro realizado com sucesso"})

@manga_bp.route('/manga/remover', methods=['DELETE'])
def registro():
    # Lógica de cadastro aqui
    return jsonify({"message": "Cadastro realizado com sucesso"})
