build_dev:
	@echo "=============Building API============="
	docker-compose -f docker-compose.common.yml -f docker-compose.dev.yml build

start_dev: build_dev
	@echo "=============Starting API in dockerized mode============="
	docker-compose up -d

build:
	@echo "=============Building API============="
	docker-compose up --build

start: build
	@echo "=============Starting API in dockerized mode============="
	docker-compose up -d

logs:
	docker-compose logs -f

stop:
	docker-compose down

dev:
	@echo "=============Starting API outside Docker============="
	yarn start:dev
