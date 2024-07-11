#!/usr/bin/env bash

echo "Composer Install..." 
composer install --no-dev --working-dir=/var/www/html 
chmod -R 777 ./storage/

# echo "Caching config..."
php artisan config:cache

# echo "Caching routes..."
php artisan route:cache

if [ "$APP_ENV" = "production" ]; then
    php artisan db:wipe --force
end

echo "Running migrations..."
php artisan migrate --force

echo "Seed"
php artisan db:seed --force --class=DatabaseSeeder

echo "Creating Personal Access Token"
php artisan passport:client --personal --no-interaction