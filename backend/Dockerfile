# backend/Dockerfile

FROM python:3.11-slim

ENV PYTHONUNBUFFERED 1
WORKDIR /app

# Instalamos gcc, libpq-dev y postgresql-client (pg_isready)
RUN apt-get update && \
    apt-get install -y \
      gcc \
      libpq-dev \
      postgresql-client && \
    rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
