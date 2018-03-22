# This Dockerfile builds the container for this web application
# Author: Manuel Bernal Llinares <mbdebian@gmail.com>
FROM debian:stable-slim
LABEL maintainer="Manuel Bernal Llinares <mbdebian@gmail.com>"

# Environment - Defaults
ENV FOLDER_BASE /home/webapp
ENV FOLDER_NAME_SITE site
ENV FOLDER_WEBSITE_ROOT ${FOLDER_BASE}/${FOLDER_NAME_SITE}
ENV DJANGO_SETTINGS_MODULE projectweb.settings.production
ENV DJANGO_ALLOWED_HOSTS *.identifiers.org
ENV DJANGO_STATIC_ROOT ${FOLDER_WEBSITE_ROOT}/static
ENV SITE_CNAME cloud.identifiers.org

# Site folder
RUN mkdir -p ${FOLDER_BASE}

# Install Application REQUIREMENTS
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y python3 python3-pip git nginx && \
    cd ${FOLDER_BASE} && \
    git clone https://github.com/identifiers-org/cloud-web-frontend.git ${FOLDER_NAME_SITE} && \
    pip3 install --no-cache-dir pipreqs nose && \
    pip3 install --no-cache-dir -r site/requirements.txt && \
    pip3 install --no-cache-dir gunicorn && \
    rm /etc/nginx/sites-enabled/default && \
    ln -s ${FOLDER_WEBSITE_ROOT}/deployment/nginx.conf /etc/nginx/sites-enabled/site && \
    mkdir -p ${DJANGO_STATIC_ROOT} && \
    cd /home/webapp/site && \
    python3 manage.py collectstatic --noinput

# Launch information
EXPOSE 9090
WORKDIR /home/webapp/site
CMD deployment/startcontainer.sh
