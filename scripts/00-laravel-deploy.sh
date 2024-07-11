#!/usr/bin/env bash

echo "Composer Install..." 
composer install --no-dev --working-dir=/var/www/html 
chown www-data:www-data -R ./storage

echo "Caching config..."
php artisan config:cache

echo "Caching routes..."
php artisan route:cache

echo "Running migrations..."
php artisan migrate --force

echo "Seed"
php artisan db:seed --force --class=DatabaseSeeder
