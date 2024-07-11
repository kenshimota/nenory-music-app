#!/usr/bin/env bash

echo "Composer Install..." 
composer install --no-dev --working-dir=/var/www/html 
chmod -R 777 /var/www/html/storage/

# echo "Caching config..."
php artisan config:cache

# echo "Caching routes..."
php artisan route:cache

# drop all tables before
php artisan db:wipe --force

echo "Running migrations..."
php artisan migrate --force

echo "Seed"
php artisan db:seed --force --class=DatabaseSeeder

echo "Creating Personal Access Token"
php artisan passport:keys --force
php artisan passport:client --personal --no-interaction