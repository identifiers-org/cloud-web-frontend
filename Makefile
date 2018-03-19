# Makefile helper
# author: Manuel Bernal Llinares <mbdebian@gmail.com>

install_requirements:
	@echo "<===|DEVOPS|===> [INSTALL] Installing platform requirements"
	@python_install/bin/pip install pipreqs nose
	@python_install/bin/pip install -r requirements.txt

python_install:
	@echo "<===|DEVOPS|===> [INSTALL] Preparing Python Virtual Environment"
	@pip install --upgrade --user virtualenv
	@virtualenv -p `which python3` python_install

tmp:
	@echo "<===|DEVOPS|===> [FOLDER] Creating temporary folder"
	@mkdir tmp

dev_environment: python_install install_requirements
	@echo "<===|DEVOPS|===> [ENVIRONMENT] Preparing development environment"

install: dev_environment
	@echo "<===|DEVOPS|===> [INSTALL] Platform"

update_requirements_file: dev_environment
	@echo "<===|DEVOPS|===> [REQUIREMENTS] Updating requirements file"
	@python_install/bin/pipreqs --use-local --savepath requirements.txt $(PWD)

tests: dev_environment
	@echo "<===|DEVOPS|===> [TESTS] Running unit tests"

clean_dev:
	@echo "<===|DEVOPS|===> [HOUSEKEEPING] Cleaning development environment"
	@rm -rf python_install

clean_tmp:
	@echo "<===|DEVOPS|===> [HOUSEKEEPING] Cleaning temporary folder"
	@rm -rf tmp

clean: clean_tmp
	@echo "<===|DEVOPS|===> [HOUSEKEEPING] Cleaning"

clean_all: clean clean_dev
	@echo "<===|DEVOPS|===> [HOUSEKEEPING] Cleaning all environments"

.PHONY: install dev_environment install_requirements update_requirements_file tests clean_dev clean_all clean_tmp clean
