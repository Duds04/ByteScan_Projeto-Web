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
                {
                    "numero": 1,
                    "titulo": "Para Ti, 2.000 Anos Depois",
                    "imagens": [
                        "https://s3.yomucomics.com/uploads/media/001.jpg",
                        "https://s3.yomucomics.com/uploads/media/002.jpg",
                        "https://s3.yomucomics.com/uploads/media/003.jpg",
                        "https://s3.yomucomics.com/uploads/media/004.jpg",
                    ]
                },
                {
                    "numero": 2,
                    "titulo": "Aquele Dia",
                    "imagens": [
                        "https://example.com/snkap2-1.jpg",
                        "https://example.com/snkap2-2.jpg"
                    ]
                }
                # Adicione mais capítulos se quiser
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
                {
                    "numero": 1,
                    "titulo": "Romance Dawn",
                    "imagens": [
                        "https://example.com/opcap1-1.jpg",
                        "https://example.com/opcap1-2.jpg"
                    ]
                },
                {
                    "numero": 2,
                    "titulo": "O Grande Espadachim Aparece",
                    "imagens": [
                        "https://example.com/opcap2-1.jpg",
                        "https://example.com/opcap2-2.jpg"
                    ]
                }
                # Adicione mais capítulos se quiser
            ]
        }
    ]

    for manga_data in mangas_data:
        capitulos_data = manga_data.pop("capitulos")
        novo_manga = Manga(**manga_data)
        db.session.add(novo_manga)
        db.session.flush()  # Para garantir novo_manga.id

        ultimo_cap = None
        for cap in capitulos_data:
            novo_capitulo = Capitulo(
                numero=cap["numero"],
                titulo=cap["titulo"],
                imagens=cap.get("imagens", []),
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
