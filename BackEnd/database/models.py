from datetime import datetime, timezone
from database.db import db


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    image_url = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))

    obras_favoritas = db.relationship('Favorito', backref='user', cascade="all, delete-orphan")
    historico = db.relationship('Historico', backref='user', cascade="all, delete-orphan")
    avaliacoes = db.relationship('Avaliacao', backref='user', cascade="all, delete-orphan")


class Obra(db.Model):
    __tablename__ = 'obras'

    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(100), nullable=False)
    descricao = db.Column(db.Text)
    genero = db.Column(db.String(50), nullable=False)
    categoria = db.Column(db.String(50), nullable=False)
    capa_url = db.Column(db.String(255))
    status = db.Column(db.String(50), default='Em andamento')
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))

    capitulos = db.relationship('Capitulo', backref='obra', cascade="all, delete-orphan")
    avaliacoes = db.relationship('Avaliacao', backref='obra', cascade="all, delete-orphan")
    favoritos = db.relationship('Favorito', backref='obra', cascade="all, delete-orphan")


class Capitulo(db.Model):
    __tablename__ = 'capitulos'

    id = db.Column(db.Integer, primary_key=True)
    numero = db.Column(db.Integer, nullable=False)
    titulo = db.Column(db.String(100))
    data_postagem = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    pdf_url = db.Column(db.String(255))

    obra_id = db.Column(db.Integer, db.ForeignKey('obras.id'), nullable=False)


class Avaliacao(db.Model):
    __tablename__ = 'avaliacoes'

    id = db.Column(db.Integer, primary_key=True)
    nota = db.Column(db.Integer, nullable=False)
    comentario = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    obra_id = db.Column(db.Integer, db.ForeignKey('obras.id'), nullable=False)


class Favorito(db.Model):
    __tablename__ = 'favoritos'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    obra_id = db.Column(db.Integer, db.ForeignKey('obras.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))


class Historico(db.Model):
    __tablename__ = 'historico'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    obra_id = db.Column(db.Integer, db.ForeignKey('obras.id'), nullable=False)
    capitulo_id = db.Column(db.Integer, db.ForeignKey('capitulos.id'), nullable=False)
    data_leitura = db.Column(db.DateTime, default=datetime.now(timezone.utc))


class Anuncio(db.Model):
    __tablename__ = 'anuncios'

    id = db.Column(db.Integer, primary_key=True)
    imagem_url = db.Column(db.String(255), nullable=False)
    link = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))
