# scripts/db_tools.py

import os
import pymysql
from app import create_app
from database.db import db
from database.models import User, Obra, Capitulo, Avaliacao  # ajuste para o nome real do seu models.py
import click

def create_database_if_not_exists():
    user = os.getenv("DB_USERNAME")
    password = os.getenv("DB_PASSWORD")
    host = "localhost"
    dbname = "bytescan"

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

def init_db():
    create_database_if_not_exists()
    app = create_app()
    with app.app_context():
        db.create_all()
        print("Banco de dados e tabelas criados com sucesso!")

def reset_db():
    app = create_app()
    with app.app_context():
        db.reflect()
        db.drop_all()
        db.create_all()
        print("Banco de dados resetado com sucesso!")

def pop_vars(obj):
    data = vars(obj).copy()
    data.pop('_sa_instance_state', None)
    return data

def print_all_data():
    app = create_app()
    aux = 40
    with app.app_context():
        print("="*aux)
        print("BANCO DE DADOS:")
        print("="*aux)

        print("\nUSERS:")
        for user in User.query.all():
            print(pop_vars(user))

        print("\nOBRAS:")
        for obra in Obra.query.all():
            print(pop_vars(obra))

        print("\nCAPÍTULOS:")
        for cap in Capitulo.query.all():
            print(pop_vars(cap))

        print("\nAVALIAÇÕES:")
        for avali in Avaliacao.query.all():
            print(pop_vars(avali))
        
        print()
        print("="*aux)


@click.command()
@click.option('--init', is_flag=True, help="Cria o banco de dados e as tabelas.")
@click.option('--reset', is_flag=True, help="Reseta todas as tabelas do banco.")
@click.option('--print', 'print_data', is_flag=True, help="Mostra todos os dados do banco.")

def main(init, reset, print_data):
    if init:
        init_db()
    elif reset:
        reset_db()
    elif print_data:
        print_all_data()
    else:
        print("Use: --init | --reset | --print")

if __name__ == "__main__":
    main()
