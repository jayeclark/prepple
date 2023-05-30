# echo ssl setting into pg_hba.conf configuration file
service postgresql status
service postgresql start
sudo su - postgres -c "echo 'host all all all trust' > /var/lib/postgresql/pg_hba.conf"
sudo service postgresql restart
echo "*** DONE ***"