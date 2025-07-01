# Descrição do Sistema
**Sistema ByteScan:**
O ByteScan é um site que disponibiliza traduções de mangás, manhwa, webtoons e histórias em quadrinhos em geral, já traduzidas por outras Scans. O objetivo é facilitar o acesso a conteúdos traduzidos, centralizando diferentes obras em um só lugar.

---
# Front-End

   #### Guia de Execução
   
   1. Instale as dependências do projeto:
      
      npm install
   
   2. Inicie o servidor de desenvolvimento:
      
      npm run dev
   
# Back-End

#### Guia de Execução

1. Acesse a pasta `BackEnd` e crie um ambiente virtual:

   - **Windows:**
     ```
     python -m venv venv
     venv\Scripts\activate
     ```

   - **Linux/Mac:**
     ```
     python3 -m venv venv
     source venv/bin/activate
     ```

2. Instale as dependências:

   ```
   make install
   ```

3. Inicialize o banco de dados com dados de exemplo:

   ```
   make init-db
   ```

4. Inicie o servidor:

   ```
   make run
   ```

---

### Arquivo `.env`

O projeto já contém um arquivo `.env` configurado. Certifique-se apenas de **modificar a senha do banco de dados**, caso a senha do seu MySQL local seja diferente de `password`.

No trecho abaixo, substitua `password` pela sua senha real do usuário `root`:

```
DB_PASSWORD=password
DATABASE_URL=mysql+pymysql://root:password@localhost:3306/bytescan
```

> Exemplo com senha `minhasenha`:
>
> ```
> DB_PASSWORD=minhasenha
> DATABASE_URL=mysql+pymysql://root:minhasenha@localhost:3306/bytescan
> ```


---
#### Tecnologias Utilizadas
   
   - **React**: Biblioteca para construção de interfaces de usuário.
   - **Vite**: Ferramenta de build e servidor de desenvolvimento rápido.
   - **JavaScript**: Linguagem principal do projeto.
   - **Tailwind CSS**: Framework utilitário para estilização rápida e responsiva.
   
---


