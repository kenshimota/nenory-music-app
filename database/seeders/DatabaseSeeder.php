<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role;
use App\Models\State;
use App\Models\City;
use Illuminate\Database\Seeder;


class DatabaseSeeder extends Seeder {

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

        $state = State::firstOrCreate(["name" => "admin123"]);

        City::firstOrCreate(["name" => "jung", "state_id" => $state->id]);
    }
}
