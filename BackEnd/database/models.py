from datetime import datetime, timezone
from database.db import db
from sqlalchemy.dialects.postgresql import JSON

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    nome = db.Column(db.String(100), nullable=False)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    image_url = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    avaliacoes = db.relationship('Avaliacao', backref='user', cascade="all, delete-orphan", passive_deletes=True)
    favoritos = db.relationship('Favorito', backref='user', cascade="all, delete-orphan", passive_deletes=True)

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "nome": self.nome,
            "username": self.username,
            "image_url": self.image_url,
            "created_at": self.created_at.isoformat() if self.created_at else None
        }


class Manga(db.Model):
    __tablename__ = 'mangas'

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    imagemCapa = db.Column(db.String(255))
    descricao = db.Column(db.Text)
    genero = db.Column(db.String(50))
    tipo = db.Column(db.String(50))
    status = db.Column(db.String(50))
    anoLancamento = db.Column(db.Integer)
    quantidadeFavoritos = db.Column(db.Integer, default=0)
    autores = db.Column(db.String(255))
    artistas = db.Column(db.String(255))
    ultimoCapituloLancado = db.Column(db.Integer)
    idUltimoCapituloLancado = db.Column(db.Integer)

    avaliacoes = db.relationship('Avaliacao', backref='manga', cascade="all, delete-orphan", passive_deletes=True)
    capitulos = db.relationship('Capitulo', backref='manga', cascade="all, delete-orphan", passive_deletes=True)
    favoritos = db.relationship('Favorito', backref='manga', cascade="all, delete-orphan", passive_deletes=True)

    def serialize(self):
        # Cálculo da média das avaliações
        if self.avaliacoes:
            soma = sum(a.nota for a in self.avaliacoes)
            media = round(soma / len(self.avaliacoes), 1)
        else:
            media = 0

        capitulos_serializados = [
            {
                "idCap": c.id,
                "numero": c.numero,
                "titulo": c.titulo,
                "data_postagem": c.data_postagem.strftime("%d/%m/%Y")
            }
            for c in sorted(self.capitulos, key=lambda x: x.data_postagem, reverse=True)
        ]
        return {
            "id": self.id,
            "nome": self.nome,
            "imagemCapa": self.imagemCapa,
            "descricao": self.descricao,
            "genero": self.genero,
            "tipo": self.tipo,
            "status": self.status,
            "avaliacao": media,
            "anoLancamento": self.anoLancamento,
            "quantidadeFavoritos": self.quantidadeFavoritos,
            "autores": self.autores,
            "artistas": self.artistas,
            "ultimoCapituloLancado": self.ultimoCapituloLancado,
            "idUltimoCapituloLancado": self.idUltimoCapituloLancado,
            "capitulos": capitulos_serializados
        }



class Capitulo(db.Model):
    __tablename__ = 'capitulos'

    id = db.Column(db.Integer, primary_key=True)
    numero = db.Column(db.Integer, nullable=False)
    titulo = db.Column(db.String(100))
    data_postagem = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    imagens = db.Column(JSON, nullable=True)  # lista de URLs

    manga_id = db.Column(db.Integer, db.ForeignKey('mangas.id', ondelete="CASCADE"), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "numero": self.numero,
            "titulo": self.titulo,
            "data_postagem": self.data_postagem.strftime("%d/%m/%Y"),
            "imagensCapitulo": self.imagens,
            "idManga": self.manga_id
        }


class Avaliacao(db.Model):
    __tablename__ = 'avaliacoes'

    id = db.Column(db.Integer, primary_key=True)
    nota = db.Column(db.Integer, nullable=False)
    comentario = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"), nullable=False)
    manga_id = db.Column(db.Integer, db.ForeignKey('mangas.id', ondelete="CASCADE"), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "nota": self.nota,
            "comentario": self.comentario,
            "created_at": self.created_at.isoformat(),
            "user_id": self.user_id,
            "manga_id": self.manga_id
        }


class Favorito(db.Model):
    __tablename__ = 'favoritos'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"), nullable=False)
    manga_id = db.Column(db.Integer, db.ForeignKey('mangas.id', ondelete="CASCADE"), nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "manga_id": self.manga_id,
            "created_at": self.created_at.isoformat()
        }
