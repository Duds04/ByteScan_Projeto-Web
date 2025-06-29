from database.db import db
from database.models import Manga, Capitulo
from datetime import datetime, timezone

def create_mangas():
    # Verifica se já existem mangás cadastrados
    if Manga.query.first():
        print("Já existem mangás cadastrados. Abortando inserção.")
        return

    mangas_data = [
        {
            "nome": "Shingeki no Kyojin",
            "descricao": "A humanidade contra gigantes devoradores.",
            "genero": "Ação",
            "tipo": "Mangá",
            "imagemCapa": "https://example.com/shingeki.jpg",
            "status": "Finalizado",
            "anoLancamento": 2009,
            "autores": "Hajime Isayama",
            "artistas": "Hajime Isayama",
            "capitulos": [
                {"numero": 1, "titulo": "Para Ti, 2.000 Anos Depois", "pdf_url": "https://example.com/snkap1.pdf"},
                {"numero": 2, "titulo": "Aquele Dia", "pdf_url": "https://example.com/snkap2.pdf"},
                {"numero": 3, "titulo": "Uma Luz Fraca no Escuro", "pdf_url": "https://example.com/snkap3.pdf"},
                {"numero": 4, "titulo": "Arma Letal", "pdf_url": "https://example.com/snkap4.pdf"},
                {"numero": 5, "titulo": "A Muralha", "pdf_url": "https://example.com/snkap5.pdf"}
            ]
        },
        {
            "nome": "One Piece",
            "descricao": "Piratas em busca do lendário tesouro One Piece.",
            "genero": "Aventura",
            "tipo": "Mangá",
            "imagemCapa": "https://example.com/onepiece.jpg",
            "status": "Em andamento",
            "anoLancamento": 1997,
            "autores": "Eiichiro Oda",
            "artistas": "Eiichiro Oda",
            "capitulos": [
                {"numero": 1, "titulo": "Romance Dawn", "pdf_url": "https://example.com/opcap1.pdf"},
                {"numero": 2, "titulo": "O Grande Espadachim Aparece", "pdf_url": "https://example.com/opcap2.pdf"},
                {"numero": 3, "titulo": "Morgan, o Mão de Machado", "pdf_url": "https://example.com/opcap3.pdf"},
                {"numero": 4, "titulo": "O Tesouro de Buggy", "pdf_url": "https://example.com/opcap4.pdf"},
                {"numero": 5, "titulo": "Chef de Navio", "pdf_url": "https://example.com/opcap5.pdf"}
            ]
        }
    ]

    for manga_data in mangas_data:
        capitulos_data = manga_data.pop("capitulos")
        novo_manga = Manga(**manga_data)
        db.session.add(novo_manga)
        db.session.flush()  # Garante que novo_manga.id esteja disponível

        ultimo_cap = None
        for cap in capitulos_data:
            novo_capitulo = Capitulo(
                numero=cap["numero"],
                titulo=cap["titulo"],
                pdf_url=cap["pdf_url"],
                manga_id=novo_manga.id,
                data_postagem=datetime.now(timezone.utc)
            )
            db.session.add(novo_capitulo)
            ultimo_cap = novo_capitulo

        if ultimo_cap:
            novo_manga.ultimoCapituloLancado = ultimo_cap.numero
            novo_manga.idUltimoCapituloLancado = ultimo_cap.id

    db.session.commit()
    print("Mangás e capítulos inseridos com sucesso.")
