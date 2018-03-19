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
