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

bin:
	@echo "<===|DEVOPS|===> [FOLDER] Creating bin folder"
	@mkdir bin

bin/selenium: bin
	@echo "<===|DEVOPS|===> [FOLDER] Preparing selenium folder for binaries"
	@mkdir -p bin/selenium

dev_environment: python_install install_requirements
	@echo "<===|DEVOPS|===> [ENVIRONMENT] Preparing development environment"

install: dev_environment
	@echo "<===|DEVOPS|===> [INSTALL] Platform"

update_requirements_file: dev_environment
	@echo "<===|DEVOPS|===> [REQUIREMENTS] Updating requirements file"
	@#python_install/bin/pipreqs --use-local --savepath requirements.txt $(PWD)
	@python_install/bin/pip freeze > requirements.txt

tests: dev_environment
	@echo "<===|DEVOPS|===> [TESTS] Running unit tests"

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

.PHONY: install dev_environment install_requirements update_requirements_file tests clean_dev clean_all clean_tmp clean_bin clean
