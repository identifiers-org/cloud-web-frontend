# This Dockerfile builds the container for this web application
# Author: Manuel Bernal Llinares <mbdebian@gmail.com>
FROM debian:stable-slim
LABEL maintainer="Manuel Bernal Llinares <mbdebian@gmail.com>"

# Does it even make sense to create a non-provileged user for running the app within a container? Let's give it a try
# Specific user for running the web platform

# Environment - Defaults
ENV DJANGO_SETTINGS_MODULE=projectweb.settings.production
