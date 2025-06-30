import os
import random
from datetime import datetime, timezone
from collections import deque
from database.db import db
from database.models import Manga, Capitulo

def create_mangas():
    if Manga.query.first():
        print("Já existem mangás cadastrados. Abortando inserção.")
        return
    base_url_db = "/Mangas"
    base_dir = os.path.abspath(os.path.join(os.getcwd(), "../FrontEnd/public/Mangas"))

    # Dicionário com os metadados de cada mangá
    mangas_info = {
        "Infinite Mage": {
            "descricao": "O sonho de se tornar infinito de um ser humano é como uma explosão de supernova que se espalha na velocidade da luz! Esta é a história de uma criança chamada Shirone que foi abandonada em um estábulo, envolta em panos. Enquanto crescia, ele demonstrou interesse por tudo relacionado a livros e se esforçou para aprender até por conta própria. Embora Shirone fosse filho adotivo de um caçador, uma das pessoas de classe mais baixa, ele era um gênio em tudo! Um dia, como recompensa por dominar uma habilidade lendária de derrubar árvores com alguns golpes de machado, seu pai adotivo o leva em sua viagem à cidade. E nessa cidade, Shirone se arrisca na magia!",
            "genero": "Fantasia",
            "tipo": "Manhwa",
            "status": "Em andamento",
            "anoLancamento": 2022,
            "autores": "Kim Sarang",
            "artistas": "DISCOMIC"
        },
        "Omniscient Reader’s Viewpoint": {
            "descricao": "'Esse é um desenrolar que eu já conheço'. No momento em que pensei isso, o mundo foi destruído e um novo universo surgiu. A nova vida de um leitor comum começa no mundo de uma novel, a novel que só ele terminou.",
            "genero": "Ação",
            "tipo": "Manhwa",
            "status": "Em andamento",
            "anoLancamento": 2020,
            "autores": "Sing N Song",
            "artistas": "Sleepy-C"
        },
        "Os Quatro Cavaleiros do Apocalipse": {
            "descricao": "Percival, um menino gentil, mora com seu avô em um lugar remoto chamado “Dedo de Deus”. Porém, o mundo não permitirá que ele viva em paz. Um encontro com um misterioso cavaleiro muda seu destino, e um segredo chocante é revelado. O menino parte em uma jornada sem fim. Quer você conheça “Os Sete Pecados Capitais” ou não, você ainda pode se divertir! A fantasia de aventura mais esperada do mundo.",
            "genero": "Aventura",
            "tipo": "Mangá",
            "status": "Em andamento",
            "anoLancamento": 2021,
            "autores": "Nakaba Suzuki",
            "artistas": "Nakaba Suzuki"
        },
        "The Beginning After The End": {
            "descricao": "Rei Grey conquistou força, riquezas e prestígio sem iguais em um mundo governado pela habilidade marcial. Entretanto, a solidão acompanha de perto aqueles de grande poder. Por detrás da máscara de um glorioso e poderoso rei, reside a casca vazia de um homem destituído de propósito e vontade. Renascido em um novo mundo repleto de magia e monstros, o Rei Grey terá a chance de refazer sua vida. Corrigir os erros do passado não será seu único desafio, pois um perigo oculto cresce a cada instante, ameaçando destruir tudo que ele trabalhou para criar, o fazendo questionar a verdadeira razão de ter recebido uma nova vida…",
            "genero": "Fantasia",
            "tipo": "Webtoon",
            "status": "Em andamento",
            "anoLancamento": 2018,
            "autores": "TurtleMe",
            "artistas": "Fuyuki23"
        },
        "Sun ken Rock": {
            "descricao": "Essa história fantástica, é a historia de Ken, um jovem delinquente do Japão que é apaixonado por uma garota chamada Yumim. Um dia ele decide se declarar, mas ele não esperava que ela fosse à coreia se tornar uma policial. Passado alguns anos, ele vê uma reportagem, onde sua amada Yumim, aparece prendendo alguns bandidos. Ele então decide ir à Coreia para se torna um policial, que também era seu sonho desde criança, mas quando ele chega lá a realidade é outra... o que será que acontece?",
            "genero": "Ação",
            "tipo": "Mangá",
            "status": "Concluído",
            "anoLancamento": 2006,
            "autores": "Boichi",
            "artistas": "Boichi"
        },
        "Guerra das Grandes Potências": {
            "descricao": "O ano é 2206 e a humanidade tem apenas 100 anos restantes no planeta Terra. A “Batalha que derruba a nação”, uma guerra com a sobrevivência de cada país em jogo, começa!!",
            "genero": "Terror",
            "tipo": "Manga",
            "status": "Em andamento",
            "anoLancamento": 2023,
            "autores": "Anônimo",
            "artistas": "Anônimo"
        }
    }
    filas_capitulos = {}
    manga_objs = {}

    for nome_manga in os.listdir(base_dir):
        manga_path = os.path.join(base_dir, nome_manga)
        if not os.path.isdir(manga_path):
            continue

        if nome_manga not in mangas_info:
            print(f"Ignorando '{nome_manga}', metadados não encontrados.")
            continue

        info = mangas_info[nome_manga]
        capa_path = os.path.join(manga_path, "capa.png")
        imagemCapa = f"{base_url_db}/{nome_manga}/capa.png" if os.path.exists(capa_path) else None

        # Criar manga e registrar
        novo_manga = Manga(
            nome=nome_manga,
            descricao=info["descricao"],
            genero=info["genero"],
            tipo=info["tipo"],
            imagemCapa=imagemCapa,
            status=info["status"],
            anoLancamento=info["anoLancamento"],
            autores=info["autores"],
            artistas=info["artistas"]
        )
        db.session.add(novo_manga)
        db.session.flush()
        manga_objs[nome_manga] = novo_manga

        # Criar fila de capítulos
        fila = deque()
        for capitulo_nome in sorted(os.listdir(manga_path), key=lambda x: int(x) if x.isdigit() else 0):
            cap_path = os.path.join(manga_path, capitulo_nome)
            if not os.path.isdir(cap_path) or not capitulo_nome.isdigit():
                continue

            imagens = []
            for nome_arquivo in sorted(os.listdir(cap_path)):
                if nome_arquivo.lower().endswith(('.jpg', '.jpeg', '.png')):
                    url = f"{base_url_db}/{nome_manga}/{capitulo_nome}/{nome_arquivo}"
                    imagens.append(url)

            if imagens:
                fila.append({
                    "numero": int(capitulo_nome),
                    "titulo": f"Capítulo {capitulo_nome}",
                    "imagens": imagens,
                    "manga_id": novo_manga.id,
                    "manga_nome": nome_manga
                })

        if fila:
            filas_capitulos[nome_manga] = fila

    # Intercalar inserção de capítulos
    mangas_ativos = list(filas_capitulos.keys())
    ultimos_caps = {}

    while mangas_ativos:
        random.shuffle(mangas_ativos)
        for nome_manga in mangas_ativos[:]:  # cópia da lista
            fila = filas_capitulos[nome_manga]
            if fila:
                cap_info = fila.popleft()
                novo_capitulo = Capitulo(
                    numero=cap_info["numero"],
                    titulo=cap_info["titulo"],
                    imagens=cap_info["imagens"],
                    manga_id=cap_info["manga_id"],
                    data_postagem=datetime.now(timezone.utc)
                )
                db.session.add(novo_capitulo)
                db.session.flush()
                ultimos_caps[nome_manga] = novo_capitulo
            if not fila:
                mangas_ativos.remove(nome_manga)

    # Atualiza último capítulo para cada mangá
    for nome_manga, cap in ultimos_caps.items():
        manga = manga_objs[nome_manga]
        manga.ultimoCapituloLancado = cap.numero
        manga.idUltimoCapituloLancado = cap.id

    db.session.commit()
    print("Mangás e capítulos inseridos com sucesso.")