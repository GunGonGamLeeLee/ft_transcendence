#!/bin/sh
if [[ ! -z "$HOST_IP" ]]
then
	sed -i "s/localhost/$HOST_IP/g" /app/.env
fi

npm run build
cp -R /app/dist/* /frontend/