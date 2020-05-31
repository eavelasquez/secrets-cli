#!usr/local/bin/

docker pull postgres

docker run --rm --name pg-docker -e POSTGRES_PASSWORD=pg123 -d -p 5432:5432 postgres

createdb -U postgres -h localhost secretsdb # Create database
psql -U postgres -h localhost # Connect server
\c database_name # Connect database


nvm alias default 12
nvm reinstall-packages VERSION

heroku login
heroku pg:psql -a postgres-secrets-app # Connect database
heroku pg:reset -a postgres-secrets-app # Reset database
