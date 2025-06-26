import sys
from app import create_app
from database.db import db

app = create_app()

if __name__ == "__main__":
    with app.app_context():
        if "--init" in sys.argv:
            db.create_all()
            print("✅ Banco de dados inicializado com sucesso.")
        elif "--reset" in sys.argv:
            db.drop_all()
            db.create_all()
            print("✅ Banco de dados resetado com sucesso.")
        else:
            print("Use --init para criar ou --reset para resetar o banco de dados.")