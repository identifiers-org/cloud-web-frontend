#!/usr/bin/env bash
# Container start up script
# Author: Manuel Bernal Llinares <mbdebian@gmail.com>

echo "<===|DEVOPS|===> [CONFIG] Configuring NGINX site, ${SITE_CNAME}"
sed -i -- "s/SITE_CNAME/${SITE_CNAME}/g" deployment/nginx.site

echo "<===|DEVOPS|===> [CONFIG] Configuring NGINX static content location, ${DJANGO_STATIC_ROOT}"
sed -i -- "s~DJANGO_STATIC_ROOT~${DJANGO_STATIC_ROOT}~g" deployment/nginx.site

echo "<===|DEVOPS|===> [CONFIG] Configuring NGINX proxy pass using unix sockets, ${PROXY_PASS_INFORMATION}"
sed -i -- "s~PROXY_PASS_INFORMATION~${PROXY_PASS_INFORMATION}~g" deployment/nginx.site

echo "<===|DEVOPS|===> [CONFIG] Configuring NGINX logging subsystem"
#sed -i '/access_log/c\\taccess_log \/dev\/stdout' /etc/nginx/nginx.conf
#sed -i '/error_log/c\\terror_log \/dev\/stderr' /etc/nginx/nginx.conf
ln -s ${FOLDER_WEBSITE_ROOT}/deployment/nginx.conf /etc/nginx/conf.d/site.conf

echo "<===|DEVOPS|===> [CRYPTO] Generating a random secret key for Django"
export DJANGO_SECRET_KEY=$(python3 -c "import string,random; uni=string.ascii_letters+string.digits+string.punctuation; print(repr(''.join([random.SystemRandom().choice(uni) for i in range(random.randint(45,50))])))")

echo "<===|DEVOPS|===> [START] Starting Gunicorn"
gunicorn --bind ${PROXY_PASS_INFORMATION} ${GUNICORN_WSGI_APPLICATION} &
export PID_GUNICORN=$(echo $!)

echo "<===|DEVOPS|===> [START] Starting NGINX"
/etc/init.d/nginx start


echo "<===|DEVOPS|===> [DONE] This script will wait here to prevent the container from stopping"
wait

echo "<===|DEVOPS|===> [TERMINATE] Something stopped, probably gunicorn, so the scripts ends here, and with it, the container itself"