#!/usr/bin/env bash
# Container start up script
# Author: Manuel Bernal Llinares <mbdebian@gmail.com>

echo "<===|DEVOPS|===> [CONFIG] Configuring NGINX site, ${SITE_CNAME}"
sed -i -- "s/SITE_CNAME/${SITE_CNAME}/g" deployment/nginx.conf
echo "<===|DEVOPS|===> [CONFIG] Configuring NGINX static content location, ${DJANGO_STATIC_ROOT}"
sed -i -- "s/DJANGO_STATIC_ROOT/${DJANGO_STATIC_ROOT}/g" deployment/nginx.conf
echo "<===|DEVOPS|===> [CONFIG] Configuring NGINX proxy pass using unix sockets, ${PROXY_PASS_INFORMATION}"
sed -i -- "s/PROXY_PASS_INFORMATION/${PROXY_PASS_INFORMATION}/g" deployment/nginx.conf
echo "<===|DEVOPS|===> [CRYPTO] Generating a random secret key for Django"
export DJANGO_SECRET_KEY=$(python3 -c "import string,random; uni=string.ascii_letters+string.digits+string.punctuation; print(repr(''.join([random.SystemRandom().choice(uni) for i in range(random.randint(45,50))])))")
