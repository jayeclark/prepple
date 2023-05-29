# This Dockerfile contains the image specification of our database
FROM postgres:10-alpine

RUN certs.sh

COPY ./certs/out/server.key /var/lib/postgresql
COPY ./certs/out/server.crt /var/lib/postgresql
COPY ./certs/out/root.crt /var/lib/postgresql

COPY ./ssl-conf.sh /usr/local/bin

RUN chown 0:70 /var/lib/postgresql/server.key && chmod 640 /var/lib/postgresql/server.key
RUN chown 0:70 /var/lib/postgresql/server.crt && chmod 640 /var/lib/postgresql/server.crt
RUN chown 0:70 /var/lib/postgresql/root.crt && chmod 640 /var/lib/postgresql/root.crt

ENTRYPOINT ["docker-entrypoint.sh"] 

CMD [ "-c", "ssl=on" , "-c", "ssl_cert_file=/var/lib/postgresql/server.crt", "-c",\
  "ssl_key_file=/var/lib/postgresql/server.key", "-c",\
  "ssl_ca_file=/var/lib/postgresql/root.crt" ]