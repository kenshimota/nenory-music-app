<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role;
use App\Models\State;
use App\Models\City;
use Illuminate\Database\Seeder;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        Role::firstOrCreate([ 
            'name' => 'admin',
            'description' => 'Administrador del Sistema'
        ]);

        Role::firstOrCreate([
            'name' => 'employer',
            'description' => 'Empleado'
        ]);

        User::firstOrCreate([
            "username" => "admin123",
            "name" => "Administradorr",
            "last_name" => "Eriku",
            'email' => 'admin@example.com',
            "password" => "12345678",
            "identity_document" => 6565543,
            "role_id" => Role::where('name', 'admin')->first()->id,
        ]);

        $state = State::firstOrCreate(["name" => "admin123"]);

        City::firstOrCreate(["name" => "jung", "state_id" => $state->id]);


    }
}
