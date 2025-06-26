from argon2 import PasswordHasher
import jwt
import os
from datetime import datetime, timedelta

ph = PasswordHasher()

def hash_password(password):
    return ph.hash(password)

def verify_password(stored_hash, provided_password):
    try:
        return ph.verify(stored_hash, provided_password)
    except VerifyMismatchError:
        return False

def generate_token(user_id):
    payload = {
        'user_id': user_id,
        'exp': datetime.utcnow() + timedelta(days=1)
    }
    return jwt.encode(payload, os.getenv("JWT_SECRET"), algorithm='HS256')

def decode_token(token):
    try:
        return jwt.decode(token, os.getenv("JWT_SECRET"), algorithms=['HS256'])
    except:
        return None
