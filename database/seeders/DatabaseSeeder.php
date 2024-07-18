<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role;
use App\Models\State;
use App\Models\City;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;


class DatabaseSeeder extends Seeder {

    /**
     * Seed the application's database.
     */
    public function run(): void {
        Role::firstOrCreate([ 
            'name' => 'admin',
            'description' => 'Administrador del Sistema'
        ]);

        Role::firstOrCreate([
            'name' => 'employer',
            'description' => 'Empleado'
        ]);

        $json = File::json('./database/seeders/venezuela.json', JSON_THROW_ON_ERROR);

        foreach($json as $value) {
            if(!isset($value["ciudades"])) {
                continue;  
            }

            $state = State::firstOrCreate(["name" => $value["estado"]]);

            $cities = $value["ciudades"];
            foreach($cities as $city) {
                City::firstOrCreate(["name" => $city, "state_id" => $state->id]);
            }
        }
    }
}
