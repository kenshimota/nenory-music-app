<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            "username" => "test",
            "name" => "Administrador",
            "last_name" => "Erik",
            'email' => 'test@example.com',
            "password" => "f4t1m4*H1",
            "identity_document" => 27010169
        ]);
    }
}
