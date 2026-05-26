#!/bin/bash
# ─────────────────────────────────────────────────────────────────
# init-certs.sh — Obtiene el primer certificado Let's Encrypt
# Ejecutar UNA SOLA VEZ en el servidor antes de levantar el stack
# ─────────────────────────────────────────────────────────────────

DOMAIN="frodriguez.es"
EMAIL="frodriguezsidro@gmail.com"          # <-- cambia esto

set -e

# Paso 1: Arrancar nginx en modo HTTP (sin SSL)
echo ">>> [1/3] Arrancando nginx en modo HTTP temporal..."
docker compose up -d portfolio
sleep 5

# Paso 2: Obtener certificado real de Let's Encrypt
echo ">>> [2/3] Solicitando certificado a Let's Encrypt..."
docker compose run --rm certbot certonly \
  --webroot \
  --webroot-path /var/www/certbot \
  --email "$EMAIL" \
  --agree-tos \
  --no-eff-email \
  --force-renewal \
  -d "$DOMAIN" \
  -d "www.$DOMAIN"

# Paso 3: Reiniciar nginx — detecta los certs y activa HTTPS
echo ">>> [3/3] Reiniciando nginx con HTTPS activado..."
docker compose restart portfolio

# Iniciar renovación automática
docker compose up -d certbot

echo ""
echo "Certificado instalado. Accede en: https://$DOMAIN"
