#!/usr/bin/env bash
# Container start up script
# Author: Manuel Bernal Llinares <mbdebian@gmail.com>

echo "<===|DEVOPS|===> [CONFIG] Configuring NGINX site, ${SITE_CNAME}"
sed -i -- "s/SITE_CNAME/${SITE_CNAME}/g" deployment/nginx.conf
echo "<===|DEVOPS|===> [CONFIG] Configuring NGINX static content location, ${DJANGO_STATIC_ROOT}"
sed -i -- "s/DJANGO_STATIC_ROOT/${DJANGO_STATIC_ROOT}/g" deployment/nginx.conf
