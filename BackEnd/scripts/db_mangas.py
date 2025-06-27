from database.db import db
from database.models import Obra, Capitulo

def create_obras():
    # Verifica se já existem obras
    if Obra.query.first():
        print("Ja existem obras cadastradas. Abortando insercao.")
        return

    obras_data = [
        {
            "titulo": "Shingeki no Kyojin",
            "descricao": "A humanidade contra gigantes devoradores.",
            "genero": "Acao",
            "categoria": "Manga",
            "capa_url": "https://example.com/shingeki.jpg",
            "status": "Finalizado",
            "capitulos": [
                {"numero": 1, "titulo": "Para Ti, 2.000 Anos Depois", "pdf_url": "https://example.com/snkap1.pdf"},
                {"numero": 2, "titulo": "Aquele Dia", "pdf_url": "https://example.com/snkap2.pdf"},
                {"numero": 3, "titulo": "Uma Luz Fraca no Escuro", "pdf_url": "https://example.com/snkap3.pdf"},
                {"numero": 4, "titulo": "Arma Letal", "pdf_url": "https://example.com/snkap4.pdf"},
                {"numero": 5, "titulo": "A Muralha", "pdf_url": "https://example.com/snkap5.pdf"}
            ]
        },
        {
            "titulo": "One Piece",
            "descricao": "Piratas em busca do lendário tesouro One Piece.",
            "genero": "Aventura",
            "categoria": "Manga",
            "capa_url": "https://example.com/onepiece.jpg",
            "status": "Em andamento",
            "capitulos": [
                {"numero": 1, "titulo": "Romance Dawn", "pdf_url": "https://example.com/opcap1.pdf"},
                {"numero": 2, "titulo": "O Grande Espadachim Aparece", "pdf_url": "https://example.com/opcap2.pdf"},
                {"numero": 3, "titulo": "Morgan, o Mão de Machado", "pdf_url": "https://example.com/opcap3.pdf"},
                {"numero": 4, "titulo": "O Tesouro de Buggy", "pdf_url": "https://example.com/opcap4.pdf"},
                {"numero": 5, "titulo": "Chef de Navio", "pdf_url": "https://example.com/opcap5.pdf"}
            ]
        }
    ]

    for obra_data in obras_data:
        capitulos_data = obra_data.pop("capitulos")
        nova_obra = Obra(**obra_data)
        db.session.add(nova_obra)
        db.session.flush()

        for cap in capitulos_data:
            cap["obra_id"] = nova_obra.id
            novo_capitulo = Capitulo(**cap)
            db.session.add(novo_capitulo)

    db.session.commit()
    print("Obras e capitulos inseridos com sucesso.")
