DOCKER_COMPOSE						= docker-compose

DEV_DOCKER_COMPOSE_FILE		= ./.dev/docker-compose.yaml
DEV_DOCKER_COMPOSE_FLAGS	= -f $(DEV_DOCKER_COMPOSE_FILE)
DEV_DATABASE_DIR = ./database

PROD_DOCKER_COMPOSE_FILE	= ./.prod/docker-compose.yaml

RM		= rm -rf
MKDIR	= mkdir -p

help:
	@echo usage: make [target]

#dev operations

dev-up:
	@$(DOCKER_COMPOSE) $(DEV_DOCKER_COMPOSE_FLAGS) up

dev-build: dev-dependencies
	@$(DOCKER_COMPOSE) $(DEV_DOCKER_COMPOSE_FLAGS) build

dev-up-build: dev-build dev-up

dev-back:
	@$(DOCKER_COMPOSE) $(DEV_DOCKER_COMPOSE_FLAGS) up -d

dev-back-build: dev-build dev-back

dev-stop:
	@$(DOCKER_COMPOSE) $(DEV_DOCKER_COMPOSE_FLAGS) stop

dev-restart: dev-stop dev-back

dev-down:
	@$(DOCKER_COMPOSE) $(DEV_DOCKER_COMPOSE_FLAGS) down

dev-clean: dev-down
	@$(RM) $(DEV_DATABASE_DIR)/*

dev-dependencies: $(DEV_DATABASE_DIR)
	@echo "Checking dependencies is done"

$(DEV_DATABASE_DIR):
	@$(MKDIR) $@

# prod operations	

.PHONY: help dependencies up start stop restart status ps clean build build-up volume