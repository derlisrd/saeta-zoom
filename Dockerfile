FROM php:7.4-fpm

# Instalar extensiones necesarias para MySQL y utilidades comunes
RUN docker-php-ext-install pdo pdo_mysql mysqli

WORKDIR /var/www/html