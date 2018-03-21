# This Dockerfile builds the container for this web application
# Author: Manuel Bernal Llinares <mbdebian@gmail.com>
FROM debian:stable-slim
LABEL maintainer="Manuel Bernal Llinares <mbdebian@gmail.com>"

# Application Working directory
RUN mkdir -p /home/webapp/public_html
RUN mkdir -p /home/webapp/tmp

# Install Application REQUIREMENTS
ADD . /home/webapp/tmp
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y python3 python3-pip && \
    pip3 install pipreqs nose && \
    pip3 install -r /home/webapp/tmp/requirements.txt

# Environment - Defaults
ENV DJANGO_SETTINGS_MODULE=projectweb.settings.production

# Launch information
EXPOSE 9090
WORKDIR /home/webapp
