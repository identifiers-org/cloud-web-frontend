# This Dockerfile builds the container for this web application
# Author: Manuel Bernal Llinares <mbdebian@gmail.com>
FROM debian:stable-slim
LABEL maintainer="Manuel Bernal Llinares <mbdebian@gmail.com>"

# Application Working directory
RUN mkdir -p /home/webapp

# Environment - Defaults
ENV DJANGO_SETTINGS_MODULE=projectweb.settings.production
