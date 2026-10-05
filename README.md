# Comedor Invisible

Prototipo de plataforma para compartir raciones de comida entre personas cercanas, con mapa, registro/inicio de sesión, publicación y reserva.

## Estado y arquitectura

La revisión actual **ya no es solo una simulación frontend**: el JavaScript consulta `/api/auth/` y `/api/dishes/` y necesita Django para operar. Incluye Django REST Framework, JWT, PostgreSQL/TimescaleDB y Nginx. Compose también inicia Kafka y Zookeeper, aunque eso no demuestra que exista un flujo completo de eventos.

## Ejecutar el conjunto local

Necesitas Docker y Docker Compose. El puerto 80 del host debe estar libre; también se publican 5432 y 9092. Estos puertos no deben quedar abiertos a Internet.

```bash
git clone https://github.com/albertomx2/comedor-invisible.git
cd comedor-invisible
```

Crea `.env` en la raíz con valores de desarrollo privados:

```dotenv
SECRET_KEY=reemplaza_por_un_valor_largo_y_aleatorio
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
POSTGRES_DB=comedor
POSTGRES_USER=comedor
POSTGRES_PASSWORD=reemplaza_por_una_clave_unica
POSTGRES_HOST=timescaledb
POSTGRES_PORT=5432
```

```bash
docker compose config --quiet
docker compose up -d --build
docker compose ps
docker compose logs --tail=50 backend
```

Abre http://localhost. Compose espera a PostgreSQL, aplica migraciones y recoge estáticos antes de iniciar Gunicorn. Si una imagen antigua de Bitnami no está disponible, habrá que revisar y actualizar esa parte de Compose: esta documentación no garantiza que todas las imágenes sigan publicadas.

Para crear una cuenta de administración:

```bash
docker compose exec backend python manage.py createsuperuser
```

## Datos y estructura

`frontend/` contiene páginas, CSS y JavaScript; `backend/users` y `backend/dishes` implementan usuarios y raciones; `nginx/conf.d` enruta estáticos y API. Las ubicaciones del mapa pueden revelar direcciones personales.

La base persiste en el volumen `pgdata`. `docker compose down` para el conjunto; **`down -v` borra volúmenes y datos**. Guardar la base y la configuración en copias privadas.

## Verificar

```bash
docker compose exec backend python manage.py check
docker compose exec backend python manage.py test
```

Después prueba registro, login, publicación y reserva en dos sesiones con datos ficticios. Tener archivos de tests no implica cobertura completa ni pruebas exitosas.

## Límites y seguridad

JWT se guarda en almacenamiento del navegador; CORS está abierto en la configuración actual y el entorno de ejemplo usa DEBUG. Antes de producción: cerrar CORS, revisar autenticación, permisos, validación, HTTPS, abuso y tratamiento de ubicaciones. Leaflet, mapas y fuentes usan recursos externos. No se ha desplegado ni certificado para uso real o seguridad alimentaria.
