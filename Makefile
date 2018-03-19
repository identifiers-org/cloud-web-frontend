# Makefile helper
# author: Manuel Bernal Llinares <mbdebian@gmail.com>

install_requirements:
	@echo "<===|DEVOPS|===> [INSTALL] Installing platform requirements"
	@python_install/bin/pip install pipreqs nose
	@python_install/bin/pip install -r requirements.txt
