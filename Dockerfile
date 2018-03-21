# This Dockerfile builds the container for this web application
# Author: Manuel Bernal Llinares <mbdebian@gmail.com>
FROM debian:stable-slim
LABEL maintainer="Manuel Bernal Llinares <mbdebian@gmail.com>"

# Site folder
RUN mkdir -p /home/webapp

# Install Application REQUIREMENTS
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y python3 python3-pip git nginx && \
    cd /home/webapp && \
    git clone https://github.com/identifiers-org/cloud-web-frontend.git site && \
    pip3 install --no-cache-dir pipreqs nose && \
    pip3 install --no-cache-dir -r site/requirements.txt && \
    pip3 install gunicorn

# Environment - Defaults
ENV DJANGO_SETTINGS_MODULE=projectweb.settings.production
ENV SITE_CNAME=cloud.identifiers.org
ENV DJANGO_ALLOWED_HOSTS=*.identifiers.org

# Launch information
EXPOSE 9090
WORKDIR /home/webapp/site
CMD deployment/startcontainer.sh
