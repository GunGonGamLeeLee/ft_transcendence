#!/bin/sh

if [ ! -d "/app/node_modules" ]
then
	npm i
fi

exec npm run start