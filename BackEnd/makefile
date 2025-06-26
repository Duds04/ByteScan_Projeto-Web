ENV_FILE=.env

install:
	pip install -r requirements.txt

uninstall:
	pip uninstall -r requirements.txt -y

run:
	python run.py

init-db:
	python scripts/db_tools.py --init

reset-db:
	python scripts/db_tools.py --reset