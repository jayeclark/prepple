openssl req -new -nodes -text -out root.csr \
  -keyout root.key -subj "/CN=localhost"
chmod og-rwx root.key

openssl x509 -req -in root.csr -text -days 3650 \
  -extfile /etc/ssl/openssl.cnf -extensions v3_ca \
  -signkey root.key -out root.crt

openssl req -new -nodes -text -out server.csr \
  -keyout server.key -subj "/CN=dbhost.yourdomain.com"
chmod og-rwx server.key

openssl x509 -req -in server.csr -text -days 365 \
  -CA root.crt -CAkey root.key -CAcreateserial \
  -out server.crt

cp server.key certs/out/server.key
cp server.crt certs/out/server.crt
rm server.key
rm server.crt

openssl x509 -in root.crt -out root.pem
cp root.pem ../src/backend/src/main/resources/certificates/root.pem