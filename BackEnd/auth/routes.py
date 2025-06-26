from flask import Blueprint, jsonify

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/ping")
def ping():
    return jsonify({"message": "pong"})

# @auth_bp.route("/register", methods=["POST"])
# def register():
#     data = request.get_json()
#     name = data.get("name")
#     email = data.get("email")
#     password = data.get("password")

#     if User.query.filter_by(email=email).first():
#         return jsonify({"error": "Email já cadastrado"}), 400

#     new_user = User(
#         name=name,
#         email=email,
#         password=hash_password(password)
#     )
#     db.session.add(new_user)
#     db.session.commit()

#     return jsonify({"message": "Usuário registrado com sucesso!"}), 201


# @auth_bp.route("/login", methods=["POST"])
# def login():
#     data = request.get_json()
#     email = data.get("email")
#     password = data.get("password")

#     user = User.query.filter_by(email=email).first()

#     if not user or not verify_password(user.password, password):
#         return jsonify({"error": "Credenciais inválidas"}), 401

#     token = generate_token(user.id)
#     return jsonify({"token": token, "user": {"name": user.name, "email": user.email}})
