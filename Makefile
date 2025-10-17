# ----------------------------
# Env Variables
# ----------------------------
PROJECT_NAME := usecaseb-smarthire
DATABASE_CONTAINER := db
API_CONTAINER := api
COMPOSE := docker compose -p $(PROJECT_NAME) -f build/docker-compose.local.yaml

setup: build-if-missing pg-create pg-migrate

build-local-go-image:
	docker build -f build/local.go.Dockerfile -t $(PROJECT_NAME)-go-local:latest .
	- docker images -q -f "dangling=true" | xargs -r docker rmi -f

build-if-missing:
	docker image inspect $(PROJECT_NAME)-go-local:latest >/dev/null 2>&1 || $(MAKE) build-local-go-image

run: api-create

api-create:
	$(COMPOSE) up $(API_CONTAINER)

api-gen-models:
	$(COMPOSE) run --rm -w /api $(API_CONTAINER) sh -c '\
		sqlboiler --wipe psql && \
		GOFLAGS="-mod=vendor" goimports -w internal/repository/dbmodel/*.go'

pg-create:
	$(COMPOSE) up -d $(DATABASE_CONTAINER)

pg-migrate:
	$(COMPOSE) --profile tools run --rm db-migrate up

api-gen-mocks:
	$(COMPOSE) --profile tools run --rm \
		--entrypoint "" mockery /bin/sh -c '\
			mockery --dir internal/controller --all --recursive --inpackage && \
			mockery --dir internal/repository --all --recursive --inpackage'

test:
	cd api; \
	sh -c 'go test -mod=vendor -p 1 -coverprofile=c.out -failfast -timeout 5m ./... | grep -v pkg'

## pg-drop: reset db to blank (dangerous!)
pg-drop:
	$(COMPOSE) --profile tools run --rm db-migrate drop

## down: stop and remove all containers/volumes for this project
# down:
# 	$(COMPOSE) down -v

# stops and removes containers, networks, and volumes used by the Docker Compose configuration
teardown:
	$(COMPOSE) down -v
	$(COMPOSE) rm --force --stop -v
