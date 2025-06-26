ENV_FILE=.env

install:
	pip install -r requirements.txt

run:
	python run.py

init-db:
	python -c "from app import create_app; from database.db import db; app = create_app(); with app.app_context(): db.create_all()"

reset-db:
	python -c "from app import create_app; from database.db import db; app = create_app(); with app.app_context(): db.drop_all(); db.create_all()"
