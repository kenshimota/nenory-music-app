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
            "username" => "jessica",
            "name" => "Administrador",
            "last_name" => "Erik",
            'email' => 'test+2@example.com',
            "password" => "manager1234",
            "identity_document" => 6565541,
            "role_id" => Role::where('name', 'admin')->first()->id,
        ]);

        $state = State::firstOrCreate(["name" => "tsate1"]);

        City::firstOrCreate(["name" => "jung", "state_id" => $state->id]);


    }
}
