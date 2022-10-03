#!/bin/sh

pg_ctl initdb -D /database
postgres -D /database -p 4245

