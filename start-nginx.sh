#!/bin/sh
# Entrypoint nginx: usa config HTTP-only si los certs aún no existen.
# Al reiniciar el contenedor después de obtener el cert, activa HTTPS automáticamente.

set -e

CERT="/etc/letsencrypt/live/frodriguez.es/fullchain.pem"

if [ ! -f "$CERT" ]; then
    echo "[nginx] Certificado SSL no encontrado → arrancando en modo HTTP temporal..."
    cp /etc/nginx/nginx-bootstrap.conf /etc/nginx/conf.d/default.conf
else
    echo "[nginx] Certificado SSL encontrado → arrancando con HTTPS activado."
fi

exec nginx -g "daemon off;"
