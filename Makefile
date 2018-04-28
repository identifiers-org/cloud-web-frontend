# Makefile helper
# Author: Manuel Bernal Llinares <mbdebian@gmail.com>

# Environment
version_latest_chrome_driver = 2.35
url_base_chrome_driver = http://chromedriver.storage.googleapis.com/
binary_linux_chromedriver = chromedriver_linux64.zip
binary_mac_chromedriver = chromedriver_mac64.zip
binary_windows_chromedriver = chromedriver_win32.zip
url_download_linux_chromedriver = $(url_base_chrome_driver)$(version_latest_chrome_driver)/$(binary_linux_chromedriver)
url_download_mac_chromedriver = $(url_base_chrome_driver)$(version_latest_chrome_driver)/$(binary_mac_chromedriver)
url_download_windows_chromedriver = $(url_base_chrome_driver)$(version_latest_chrome_driver)/$(binary_windows_chromedriver)
container_name = identifiersorg/cloud-web-frontend
docker_compose_development_file = docker-compose-development.yml
development_profile = projectweb.settings.base
file_web_server_pid = web_server.pid
tag_version = $(shell cat VERSION)
file_path_web_server_log = $(shell date -u +"logs/django_runserver_%Y-%m-%dT%H:%M:%SZ.log")

all:
	@echo "<===|DEVOPS|===> [INFO] NO DEFAULT target set"

# Release cycle
release: deploy set_next_development_version
	@echo "<===|DEVOPS|===> [RELEASE] New Software Release, and next development version prepared"

sync_project_version:
	@echo "<===|DEVOPS|===> [SYNC] Synchronizing project version to version '${tag_version}'"

set_next_development_version:
	@echo "<===|DEVOPS|===> [SYNC] Setting the new development version, current ${tag_version}"

deploy: clean container_production_push
	@echo "<===|DEVOPS|===> [DEPLOY] Deploying service container version ${tag_version}"

development_env_up: tmp
	@echo "<===|DEVOPS|===> [ENVIRONMENT] Bringing development environment UP"
	@docker-compose -f $(docker_compose_development_file) up -d
	@# TODO Clean this way of referencing the target name in future iterations
	@echo "DJANGO_SETTINGS_MODULE=${development_profile}" >> .env
	@set -a; source .env; set +a; python_install/bin/python manage.py runserver > ${file_path_web_server_log} 2>&1 & echo "$$!" > ${file_web_server_pid}
	@rm -f development_env_down
	@touch development_env_up

development_env_down:
	@echo "<===|DEVOPS|===> [ENVIRONMENT] Bringing development environment DOWN"
	@#kill -9 $(shell cat ${file_web_server_pid}) && rm ${file_web_server_pid}
	@for pid in `ps aux | grep "manage.py runserver" | grep -v grep | awk '{print $$2}'`; do echo "Killing web server with PID $$pid"; kill -9 $$pid; done
	@> .env
	@rm ${file_web_server_pid}
	@docker-compose -f $(docker_compose_development_file) down
	@# TODO Clean this way of referencing the target name in future iterations
	@rm -f development_env_up
	@touch development_env_down

development_run_tests: development_env_up
	@echo "<===|DEVOPS|===> [TESTS] Running Unit Tests"
	@python_install/bin/python manage.py test

container_production_build:
	@echo "<===|DEVOPS|===> [BUILD] Production container $(container_name):$(tag_version)"
	@docker build -t $(container_name):$(tag_version) -t $(container_name):latest .

container_production_push: container_production_build
	@echo "<===|DEVOPS|===> [PUBLISH]> Production container $(container_name):$(tag_version)"
	@docker push $(container_name):$(tag_version)
	@docker push $(container_name):latest

# Installation related targets
install: dev_environment
	@echo "<===|DEVOPS|===> [INSTALL] Platform"

dev_environment: python_install install_requirements chromedriver run logs
	@echo "<===|DEVOPS|===> [ENVIRONMENT] Preparing development environment"

python_install:
	@echo "<===|DEVOPS|===> [INSTALL] Preparing Python Virtual Environment"
	@pip install --upgrade --user virtualenv
	@virtualenv -p `which python3` python_install

install_requirements:
	@echo "<===|DEVOPS|===> [INSTALL] Installing platform requirements"
	@python_install/bin/pip install pipreqs nose
	@python_install/bin/pip install -r requirements.txt

chromedriver: tmp bin/selenium
	@echo "<===|DEVOPS|===> [INSTALL] Installing Google Chrome Driver"
	@cd tmp; wget $(url_download_linux_chromedriver)
	@cd tmp; wget $(url_download_mac_chromedriver)
	@cd tmp; wget $(url_download_windows_chromedriver)
	@cd tmp; unzip $(binary_linux_chromedriver); mv chromedriver ../bin/selenium/chromedriver-linux
	@cd tmp; unzip $(binary_mac_chromedriver); mv chromedriver ../bin/selenium/chromedriver-mac
	@cd tmp; unzip $(binary_windows_chromedriver); mv chromedriver.exe ../bin/selenium/.

# Folders
tmp:
	@echo "<===|DEVOPS|===> [FOLDER] Creating temporary folder"
	@mkdir -p tmp/fakesmtp

bin:
	@echo "<===|DEVOPS|===> [FOLDER] Creating bin folder"
	@mkdir bin

run:
	@echo "<===|DEVOPS|===> [FOLDER] Creating 'run' folder"
	@mkdir run

logs:
	@echo "<===|DEVOPS|===> [FOLDER] Creating 'logs' folder"
	@mkdir logs

bin/selenium: bin
	@echo "<===|DEVOPS|===> [FOLDER] Preparing selenium folder for binaries"
	@mkdir -p bin/selenium
# END - Folders

update_requirements_file:
	@echo "<===|DEVOPS|===> [REQUIREMENTS] Updating requirements file"
	@#python_install/bin/pipreqs --use-local --savepath requirements.txt $(PWD)
	@python_install/bin/pip freeze > requirements.txt

tests: dev_environment
	@echo "<===|DEVOPS|===> [TESTS] Running unit tests"

# Housekeeping
clean_dev:
	@echo "<===|DEVOPS|===> [HOUSEKEEPING] Cleaning development environment"
	@rm -rf python_install

clean_tmp:
	@echo "<===|DEVOPS|===> [HOUSEKEEPING] Cleaning temporary folder"
	@rm -rf tmp

clean_bin:
	@echo "<===|DEVOPS|===> [HOUSEKEEPING] Cleaning external binaries"
	@rm -rf bin/*

clean: clean_tmp
	@echo "<===|DEVOPS|===> [HOUSEKEEPING] Cleaning"

clean_all: clean clean_dev
	@echo "<===|DEVOPS|===> [HOUSEKEEPING] Cleaning all environments"
# END - Housekeeping

.PHONY: install dev_environment install_requirements update_requirements_file tests clean_dev clean_all clean_tmp clean_bin clean development_run_tests container_production_build container_production_push deploy release sync_project_version set_next_development_version
