import requests
import os

# https://cdn.sussytoons.site/scans/1/obras/10838/capitulos/10/pagina_2.avif
# https://cdn.sussytoons.site/scans/1/obras/9825/capitulos/3/004Resultado.jpg
# https://cdn.sussytoons.site/scans/1/obras/11473/capitulos/1/003Resultado.jpg


# Parâmetros fixos da URL
scan_id = 1
obra_id = 11473
capitulos = 5  # Quantidade de capítulos a baixar
# Pasta raiz onde tudo será salvo
pasta_destino_raiz = "FrontEnd/public/Mangas/"
pasta_destino_raiz = os.path.join(pasta_destino_raiz, "Guerra das Grandes Potências")

# Para cada capítulo
for cap in range(1, capitulos + 1):
    # Cria a pasta do capítulo se não existir
    pasta_destino = os.path.join(pasta_destino_raiz, str(cap))
    os.makedirs(pasta_destino, exist_ok=True)
    pag = 2  # Começa da página X (ajuste se necessário)
    neg = pag - 1
    while True:
        # Monta a URL da página
        # https://cdn.sussytoons.site/scans/1/obras/9825/capitulos/3/004Resultado.jpg
        url = f"https://cdn.sussytoons.site/scans/{scan_id}/obras/{obra_id}/capitulos/{cap}/{pag:03d}Resultado.jpg"
        # Define o nome do arquivo local
        nome_arquivo = os.path.join(pasta_destino, f"{pag-neg}.jpg")
        # Faz o download da imagem
        resp = requests.get(url)
        if resp.status_code == 200:
            # Salva a imagem na pasta
            with open(nome_arquivo, "wb") as f:
                f.write(resp.content)
            pag += 1  # Vai para a próxima página
        else:
            # Para de baixar páginas quando não encontrar mais (404)
            break