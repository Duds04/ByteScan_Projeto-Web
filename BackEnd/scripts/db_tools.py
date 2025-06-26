import os
import pymysql
from app import create_app
from database.db import db

def create_database_if_not_exists():
    # Pegando dados de conexão do .env
    user = os.getenv("DB_USERNAME")
    password = os.getenv("DB_PASSWORD")
    
    host = "localhost"
    dbname = "bytescan"

    # Conectando sem especificar o banco de dados
    connection = pymysql.connect(
        host=host,
        user=user,
        password=password,
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor
    )

    with connection:
        with connection.cursor() as cursor:
            cursor.execute(f"CREATE DATABASE IF NOT EXISTS {dbname}")
        connection.commit()

if __name__ == "__main__":
    create_database_if_not_exists()

    app = create_app()
    with app.app_context():
        db.create_all()
        print("✅ Banco de dados e tabelas criados com sucesso!")
