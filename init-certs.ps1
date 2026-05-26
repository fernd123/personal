# ─────────────────────────────────────────────────────────────────
# init-certs.ps1 — Obtiene el primer certificado Let's Encrypt
# Ejecutar UNA SOLA VEZ en el servidor antes de levantar el stack
# ─────────────────────────────────────────────────────────────────

$DOMAIN = "frodriguez.es"
$EMAIL  = "frodriguezsidro@gmail.com"

$ErrorActionPreference = "Stop"

# Paso 1: Arrancar nginx en modo HTTP (start-nginx.sh detecta que no hay cert y usa bootstrap)
Write-Host ">>> [1/3] Arrancando nginx en modo HTTP temporal..." -ForegroundColor Cyan
docker compose up -d portfolio
Start-Sleep -Seconds 5

# Paso 2: Obtener certificado real de Let's Encrypt
Write-Host ">>> [2/3] Solicitando certificado a Let's Encrypt..." -ForegroundColor Cyan
docker compose run --rm certbot certonly `
  --webroot `
  --webroot-path /var/www/certbot `
  --email $EMAIL `
  --agree-tos `
  --no-eff-email `
  --force-renewal `
  -d $DOMAIN `
  -d "www.$DOMAIN"

# Paso 3: Reiniciar nginx — al arrancar detecta los certs y activa HTTPS automáticamente
Write-Host ">>> [3/3] Reiniciando nginx con HTTPS activado..." -ForegroundColor Cyan
docker compose restart portfolio

# Iniciar renovación automática de certificados (cada 12h)
docker compose up -d certbot

Write-Host ""
Write-Host "Certificado instalado. Accede en: https://$DOMAIN" -ForegroundColor Green
