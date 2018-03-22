# This Dockerfile builds the container for this web application
# Author: Manuel Bernal Llinares <mbdebian@gmail.com>
FROM debian:stable-slim
LABEL maintainer="Manuel Bernal Llinares <mbdebian@gmail.com>"

# Environment - Defaults
ENV DJANGO_SETTINGS_MODULE projectweb.settings.production
ENV DJANGO_ALLOWED_HOSTS *.identifiers.org
ENV DJANGO_STATIC_ROOT /home/webapp/site/static
ENV SITE_CNAME cloud.identifiers.org

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
    pip3 install --no-cache-dir gunicorn && \
    rm /etc/nginx/sites-enabled/default && \
    ln -s /home/webapp/site/deployment/nginx.conf /etc/nginx/sites-enabled/site && \
    mkdir -p /home/webapp/site/static && \
    cd /home/webapp/site && \
    python3 manage.py collectstatic --noinput

# Launch information
EXPOSE 9090
WORKDIR /home/webapp/site
CMD deployment/startcontainer.sh
