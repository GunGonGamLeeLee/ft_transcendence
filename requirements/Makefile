DOCKER_COMPOSE						= docker-compose

DEV_DOCKER_COMPOSE_FILE		= ./.dev/docker-compose.yaml
DEV_DOCKER_COMPOSE_FLAGS	= -f $(DEV_DOCKER_COMPOSE_FILE)
DEV_DATABASE_DIR = ./database

PROD_DOCKER_COMPOSE_FILE	= ./.prod/docker-compose.yaml

RM		= rm -rf
MKDIR	= mkdir -p

help:
	@echo usage: make [target]
	@echo
	@echo "*INSTALL PACKAGE IN CONTAINER*"
	@echo make install cont=CONTAINER_NAME pack=PACKAGE_NAME
	@echo
	@echo "*INSTALL PACKAGE IN CONTAINER*"
	@echo make install-dev cont=CONTAINER_NAME pack=PACKAGE_NAME
	@echo
	@echo "*UNINSTALL PACKAGE IN CONTAINER*"
	@echo make uninstall cont=CONTAINER_NAME pack=PACKAGE_NAME
	@echo
	@echo "*UPDATE PACKAGE IN CONTAINER*"
	@echo make install cont=CONTAINER_NAME
	@echo

#dev operations

update:
	@docker exec $(cont) npm install

install:
	@docker exec $(cont) npm install --save $(pack)

install-dev:
	@docker exec $(cont) npm install --save-dev $(pack)

uninstall:
	@docker exec $(cont) npm uninstall --save $(pack)

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

dev-fclean: dev-down
	@$(MAKE) dev-clean
	@docker rmi $(shell docker images -aq)

dev-dependencies: $(DEV_DATABASE_DIR)
	@echo "Checking dependencies is done"

$(DEV_DATABASE_DIR):
	@$(MKDIR) $@

# prod operations	

.PHONY: help dependencies up start stop restart status ps clean build build-up volume
