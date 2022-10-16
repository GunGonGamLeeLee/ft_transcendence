#!/bin/bash
# FIXME env

psql --port 4245 << eof
CREATE DATABASE "Transcendence";

ALTER USER postgres WITH PASSWORD '1234';
GRANT ALL PRIVILEGES ON DATABASE postgres TO postgres;
eof

# psql Transcendence --port 4245 < /entrypoint.database.sql
