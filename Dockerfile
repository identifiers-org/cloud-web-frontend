# This Dockerfile builds the container for this web application
# Author: Manuel Bernal Llinares <mbdebian@gmail.com>
FROM debian:stable-slim
LABEL maintainer="Manuel Bernal Llinares <mbdebian@gmail.com>"

# Site folder
RUN mkdir -p /home/webapp/site
RUN mkdir -p /home/webapp/tmp

# Install Application REQUIREMENTS
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y python3 python3-pip git nginx && \
    pip3 install pipreqs nose && \
    pip3 install -r /home/webapp/tmp/requirements.txt

# Environment - Defaults
ENV DJANGO_SETTINGS_MODULE=projectweb.settings.production
ENV SITE_CNAME=cloud.identifiers.org

# Launch information
EXPOSE 9090
WORKDIR /home/webapp
