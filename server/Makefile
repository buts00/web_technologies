HOST=127.0.0.1
PORT=8002

VENV_DIR=venv

# Commands to manage virtual environment
create_venv:
	python3 -m venv $(VENV_DIR)

activate_venv_macos:
	source $(VENV_DIR)/bin/activate

activate_venv_windows:
	.\$(VENV_DIR)\Scripts\activate

install_deps:
	pip install -r requirements.txt

update_deps:
	pip freeze -> requirements.txt


create_env_and_install: create_venv install_deps

# FastAPI commands
run:
	uvicorn src.api.main:app --host $(HOST) --port $(PORT)  --reload

db_connect:
	psql -h localhost -U postgres -d vevi
# Alembic commands
migrate:
	alembic revision --autogenerate -m "new migration"

upgrade:
	alembic upgrade head

downgrade:
	alembic downgrade -1

# Other helpful commands
test:
	pytest

lint:
	$(VENV_DIR)/bin/flake8 $(APP_NAME)

# Clean commands
clean_pyc:
	find . -name "*.pyc" -exec rm -f {} \;

clean_env:
	rm -rf $(VENV_DIR)



# Full setup
setup: create_env_and_install upgrade

.PHONY: run migrate upgrade downgrade test lint clean_pyc clean_env setup mkcert_install generate_mkcert update_deps
