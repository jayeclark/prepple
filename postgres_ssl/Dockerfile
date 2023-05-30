# This Dockerfile contains the image specification of our database
FROM postgres:10-alpine

ENV POSTGRES_USER jayclark
ENV POSTGRES_PASSWORD password1
ENV POSTGRES_DB prepple
ENV POSTGRES_HOST_AUTH_METHOD trust

COPY ./certs/out/server.key /var/lib/postgresql/server.key
COPY ./certs/out/server.crt /var/lib/postgresql/server.crt
COPY ./certs/out/root.crt /var/lib/postgresql/root.crt

RUN chown 0:70 /var/lib/postgresql/server.key && chmod 640 /var/lib/postgresql/server.key
RUN chown 0:70 /var/lib/postgresql/server.crt && chmod 640 /var/lib/postgresql/server.crt

ENTRYPOINT ["docker-entrypoint.sh"] 

CMD [ "-c", "ssl=on" , "-c", "ssl_cert_file=/var/lib/postgresql/server.crt", "-c",\
  "ssl_key_file=/var/lib/postgresql/server.key", "-c",\
  "ssl_ca_file=/var/lib/postgresql/root.crt" ]