#!/bin/sh

COUNT=0;
$( nc -zv database $DBPORT );
until [ $? -eq 0 ]
do
	sleep 10;
	if [ $COUNT -eq 6 ]
	then
		exit 1;
	fi
	COUNT=$((COUNT+1))
	$( nc -zv database $DBPORT );
done;

if [[ ! -z "$HOST_IP" ]]
then
	sed -i "s/localhost/$HOST_IP/g" /prod.backend.env
fi
sed -i "s/plz-input-api-uid/$API_UID/g" /prod.backend.env
sed -i "s/plz-input-api-secret/$API_SECRET/g" /prod.backend.env
exec node /app/dist/main.js