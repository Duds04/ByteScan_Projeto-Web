import requests
import os

# Lista de URLs base (cada uma para um capítulo diferente, por exemplo)
bases_url = [
    "https://cdn.sussytoons.site/wp-content/uploads/WP-manga/data/manga_663496afbc13e/3bf7343f42d8e15012bd91e25589d025/",
    "https://cdn.sussytoons.site/wp-content/uploads/WP-manga/data/manga_663496afbc13e/594324732b573fc18acf14b93c5376bc/",
    "https://cdn.sussytoons.site/wp-content/uploads/WP-manga/data/manga_663496afbc13e/0d8525ec1365f242cfb30318d5a260dd/",
    "https://cdn.sussytoons.site/wp-content/uploads/WP-manga/data/manga_663496afbc13e/ba245b26adb1062179c5bc4167d9fc27/",
    "https://cdn.sussytoons.site/wp-content/uploads/WP-manga/data/manga_663496afbc13e/b2e8f5f7bff413d788713c45ed3efbca/",
    "https://cdn.sussytoons.site/wp-content/uploads/WP-manga/data/manga_663496afbc13e/417a092e035b562418edc08dc81991c8/",
    "https://cdn.sussytoons.site/wp-content/uploads/WP-manga/data/manga_663496afbc13e/e1c497c447ebdf3704103704b5254f12/",
    "https://cdn.sussytoons.site/wp-content/uploads/WP-manga/data/manga_663496afbc13e/72682f1b222240d5f3ddf02a041d1950/",
]

# Nome das pastas para cada capítulo (deve ter o mesmo tamanho que bases_url)
pastas = [f"O Começo Depois do Fim/{i+1}/" for i in range(len(bases_url))]

# Pasta raiz onde tudo será salvo
pasta_destino_raiz = "FrontEnd/public/Mangas/"

for idx, base_url in enumerate(bases_url):
    pasta_destino = os.path.join(pasta_destino_raiz, pastas[idx])
    os.makedirs(pasta_destino, exist_ok=True)
    i = 2
    while True:
        url = base_url + "{:03d}.jpg".format(i)
        nome_arquivo = os.path.join(pasta_destino, f"{i-1}.png")
        resp = requests.get(url)
        if resp.status_code == 200:
            with open(nome_arquivo, "wb") as f:
                f.write(resp.content)
            i += 1
        else:
            break