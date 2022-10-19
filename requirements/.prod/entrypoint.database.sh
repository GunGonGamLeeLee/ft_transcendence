#!/bin/bash
# FIXME env

psql --port $PGPORT -U $POSTGRES_USER << eof
CREATE DATABASE "$DB_DATABASE";

ALTER USER "$POSTGRES_USER" WITH PASSWORD "$POSTGRES_PASSWORD";
GRANT ALL PRIVILEGES ON DATABASE "$POSTGRES_USER" TO "$POSTGRES_USER";
eof
