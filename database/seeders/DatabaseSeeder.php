<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role;
use App\Models\State;
use App\Models\City;
use App\Models\MeasureType;
use App\Models\Measure;
use App\Models\MeasureRelationship;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;


class DatabaseSeeder extends Seeder {

    public function measures() {
        return [
            [

                "name" => "Masa",
                "measures" => [
                    ["name" => "miligramos", "abreviated" => "mg", "amount" => 1],
                    ["name" => "gramos", "abreviated" => "g", "amount" => 1000],
                    ["name" => "kilogramos", "abreviated" => "kg" , "amount"  => 1000000],
               
                ],
            ],
            [
                "name" => "Liquidos",
                "measures" => [
                    ["name" => "mililitros", "abreviated" => "ml", "amount" => 1],
                    ["name" => "litros", "abreviated" => "L", "amount" => 1000],
                ],
            ],
            [
                "name" => "Numerico",
                "measures" => [
                    ["name" => "unidades", "abreviated" => "", "amount" => 1],
                ]
            ]
        ];
    }



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

        $measure_types = $this->measures();
        foreach($measure_types as $key => $measure_type) {
            $type = MeasureType::firstOrCreate([ "name" => $measure_type["name"] ]);
            $measures = $measure_type["measures"];


            foreach($measures as &$measure) {
                $a = Measure::firstOrCreate([
                    "name" => $measure["name"],
                    "abreviated" => $measure["abreviated"],
                    "measure_type_id" => $type->id,
                ]);

                $measure["id"] = $a->id;
            }

            for($i = 0; $i < count($measures); $i++) {
                $a = $measures[$i];

                for($j = 0; $j < count($measures); $j++){
                    if($j === $i) {
                        continue;  
                    }
                    
                    $b = $measures[$j];

                    MeasureRelationship::firstOrCreate([
                        "measure_id" => $a["id"],
                        "related_measure_id" => $b["id"],
                        "amount" => $b["amount"] / $a["amount"],
                    ]);
                }      
            }
        }


    }
}
