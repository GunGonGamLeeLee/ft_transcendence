#!/bin/sh
if [[ ! -z "$HOST_IP" ]]
then
	sed -i "s/localhost/$HOST_IP/g" /prod.backend.env
fi
sed -i "s/plz-input-api-uid/$API_UID/g" /prod.backend.env
sed -i "s/plz-input-api-secret/$API_SECRET/g" /prod.backend.env
/app/node_modules/.bin/nest build