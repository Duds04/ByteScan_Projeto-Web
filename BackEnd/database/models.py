from datetime import datetime, timezone
from database.db import db


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    nome = db.Column(db.String(100), nullable=False)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    image_url = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    avaliacoes = db.relationship('Avaliacao', backref='user', cascade="all, delete-orphan")

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "nome": self.nome,
            "username": self.username,
            "image_url": self.image_url,
            "created_at": self.created_at.isoformat() if self.created_at else None
        }


class Obra(db.Model):
    __tablename__ = 'obras'

    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(100), nullable=False)
    descricao = db.Column(db.Text)
    genero = db.Column(db.String(50), nullable=False)
    categoria = db.Column(db.String(50), nullable=False)
    capa_url = db.Column(db.String(255))
    status = db.Column(db.String(50), default='Em andamento')
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    avaliacoes = db.relationship('Avaliacao', backref='obra', cascade="all, delete-orphan")
    capitulos = db.relationship('Capitulo', backref='obra', cascade="all, delete-orphan")

    def serialize(self):
        return {
            "id": self.id,
            "titulo": self.titulo,
            "descricao": self.descricao,
            "genero": self.genero,
            "categoria": self.categoria,
            "capa_url": self.capa_url,
            "status": self.status,
            "created_at": self.created_at.isoformat()
        }


class Capitulo(db.Model):
    __tablename__ = 'capitulos'

    id = db.Column(db.Integer, primary_key=True)
    numero = db.Column(db.Integer, nullable=False)
    titulo = db.Column(db.String(100))
    data_postagem = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    pdf_url = db.Column(db.String(255))

    obra_id = db.Column(db.Integer, db.ForeignKey('obras.id'), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "numero": self.numero,
            "titulo": self.titulo,
            "data_postagem": self.data_postagem.isoformat(),
            "pdf_url": self.pdf_url,
            "obra_id": self.obra_id
        }


class Avaliacao(db.Model):
    __tablename__ = 'avaliacoes'

    id = db.Column(db.Integer, primary_key=True)
    nota = db.Column(db.Integer, nullable=False)
    comentario = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    obra_id = db.Column(db.Integer, db.ForeignKey('obras.id'), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "nota": self.nota,
            "comentario": self.comentario,
            "created_at": self.created_at.isoformat(),
            "user_id": self.user_id,
            "obra_id": self.obra_id
        }
        
class Favorito(db.Model):
    __tablename__ = 'favoritos'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    obra_id = db.Column(db.Integer, db.ForeignKey('obras.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    user = db.relationship('User', backref=db.backref('favoritos', cascade="all, delete-orphan"))
    obra = db.relationship('Obra', backref=db.backref('favoritos', cascade="all, delete-orphan"))

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "obra_id": self.obra_id,
            "created_at": self.created_at.isoformat()
        }
