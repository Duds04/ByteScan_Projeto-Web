from database.db import db
from database.models import Manga, Capitulo
from datetime import datetime, timezone

def create_mangas():
    if Manga.query.first():
        print("Já existem mangás cadastrados. Abortando inserção.")
        return

    base_url = "./ByteScan_Projeto-Web/Mangas"  # Atualize com o caminho real de hospedagem das imagens

    mangas_data = [
        {
            "nome": "The Beginning After The End",
            "descricao": "Rei poderoso reencarna em mundo mágico.",
            "genero": "Fantasia",
            "tipo": "Webtoon",
            "imagemCapa": f"{base_url}/The Beginning After The End/capa.png",
            "status": "Em andamento",
            "anoLancamento": 2018,
            "autores": "TurtleMe",
            "artistas": "Fuyuki23",
            "capitulos": [
                {
                    "numero": 1,
                    "titulo": "Capítulo 1",
                    "imagens": [
                        f"{base_url}/logo.png",
                        f"{base_url}/The Beginning After The End/1/1.jpeg",
                        f"{base_url}/The Beginning After The End/1/2.png",
                        f"{base_url}/The Beginning After The End/1/3.jpeg"
                    ]
                },
                {
                    "numero": 2,
                    "titulo": "Capítulo 2",
                    "imagens": [
                        f"{base_url}/logo.png",
                        f"{base_url}/The Beginning After The End/2/1.jpg",
                        f"{base_url}/The Beginning After The End/2/2.jpeg"
                    ]
                },
                {
                    "numero": 3,
                    "titulo": "Capítulo 3",
                    "imagens": [
                        f"{base_url}/logo.png",
                        f"{base_url}/The Beginning After The End/3/1.jpeg"
                    ]
                }
            ]
        },
        {
            "nome": "The Novel's Extra",
            "descricao": "Um personagem secundário reescreve seu destino.",
            "genero": "Ação",
            "tipo": "Webtoon",
            "imagemCapa": f"{base_url}/The Novel's Extra/capa.png",
            "status": "Em andamento",
            "anoLancamento": 2019,
            "autores": "Jeongha",
            "artistas": "Kim Junghyun",
            "capitulos": [
                {
                    "numero": 1,
                    "titulo": "Capítulo 1",
                    "imagens": [
                        f"{base_url}/logo.png",
                        f"{base_url}/The Novel's Extra/1/1.png",
                        f"{base_url}/The Novel's Extra/1/2.jpeg"
                    ]
                },
                {
                    "numero": 2,
                    "titulo": "Capítulo 2",
                    "imagens": [
                        f"{base_url}/logo.png",
                        f"{base_url}/The Novel's Extra/2/1.jpeg",
                        f"{base_url}/The Novel's Extra/2/2.jpeg",
                        f"{base_url}/The Novel's Extra/2/3.jpg"
                    ]
                },
                {
                    "numero": 3,
                    "titulo": "Capítulo 3",
                    "imagens": [
                        f"{base_url}/logo.png",
                        f"{base_url}/The Novel's Extra/3/1.jpeg",
                        f"{base_url}/The Novel's Extra/3/2.jpeg",
                        f"{base_url}/The Novel's Extra/3/3.jpeg",
                        f"{base_url}/The Novel's Extra/3/4.jpeg",
                        f"{base_url}/The Novel's Extra/3/5.jpeg"
                    ]
                }
            ]
        }
    ]

    for manga_data in mangas_data:
        capitulos_data = manga_data.pop("capitulos")
        novo_manga = Manga(**manga_data)
        db.session.add(novo_manga)
        db.session.flush()

        ultimo_cap = None
        for cap in capitulos_data:
            novo_capitulo = Capitulo(
                numero=cap["numero"],
                titulo=cap["titulo"],
                imagens=cap["imagens"],
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
