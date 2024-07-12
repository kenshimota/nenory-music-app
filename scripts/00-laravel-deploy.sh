#!/usr/bin/env bash

echo drop all tables before
php artisan db:wipe --force

echo "Running migrations..."
php artisan migrate --force

echo "Seed"
php artisan db:seed --force --class=DatabaseSeeder

echo "Creating Personal Access Token"
php artisan passport:keys --force
php artisan passport:client --personal --no-interaction

echo "Changing Permissions"
chmod -R 777 /var/www/html/storage/