#!/bin/sh

if [ ! -d "/app/node_modules" ]
then
	npm i
fi
# dot.env
export NODE_ENV=dev
exec  /app/node_modules/.bin/nest start --watch --preserveWatchOutput