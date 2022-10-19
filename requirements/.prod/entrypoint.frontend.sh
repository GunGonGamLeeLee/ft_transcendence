#!/bin/sh

/bin/rm -rf /etc/nginx/http.d/default.conf
exec /usr/sbin/nginx -g "daemon off;";
