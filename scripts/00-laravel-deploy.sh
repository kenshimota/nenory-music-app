#!/usr/bin/env bash

# composer install
echo "Composer Install..."
composer install --no-dev --working-dir=/var/www/html

# echo "Caching config..."
# php artisan config:cache

# echo "Caching routes..."
# php artisan route:cache

echo "Running migrations..."
php artisan migrate 
