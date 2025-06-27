# Makefile

ENV_FILE=.env

ifeq ($(OS),Windows_NT)
    PYTHON_CMD=python
    SET_PATH=set PYTHONPATH=.
else
    PYTHON_CMD=python3
    SET_PATH=PYTHONPATH=.
endif

install:
	$(PYTHON_CMD) -m pip install -r requirements.txt

uninstall:
	$(PYTHON_CMD) -m pip uninstall -r requirements.txt -y

run:
	$(PYTHON_CMD) run.py

init-db:
	$(SET_PATH) && $(PYTHON_CMD) scripts/db_tools.py --init

reset-db:
	$(SET_PATH) && $(PYTHON_CMD) scripts/db_tools.py --reset

print-db:
	$(SET_PATH) && $(PYTHON_CMD) scripts/db_tools.py --print
