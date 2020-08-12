build_dev:
	@echo "=============Building API============="
	docker-compose -f docker-compose.common.yml -f docker-compose.dev.yml build

start_dev: build_dev
	@echo "=============Starting API in dockerized mode============="
	docker-compose -f docker-compose.common.yml -f docker-compose.dev.yml up

build:
	@echo "=============Building API============="
	docker-compose -f docker-compose.common.yml -f docker-compose.prod.yml build

start: build
	@echo "=============Starting API in dockerized mode============="
	docker-compose -f docker-compose.common.yml -f docker-compose.prod.yml up -d

logs:
	docker-compose logs -f

stop:
	docker-compose -f docker-compose.common.yml -f docker-compose.dev.yml down

dev:
	@echo "=============Starting API outside Docker============="
	yarn start:dev

dev_database:
	@echo "=============Opening PG databse in development============="
	docker exec -it crime-data_pg_container_1 psql -U postgres
