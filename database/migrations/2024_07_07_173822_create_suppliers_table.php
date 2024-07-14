<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('suppliers', function (Blueprint $table) {
            $table->id();
            $table->string("name")->nullable(false);
            $table->string("email")->nullable(false)->unique();
            $table->integer("code_postal");
            $table->bigInteger("identity_document")->nullable(false);
            $table->unsignedBigInteger('city_id')->nullable(false);
            $table->foreign("city_id")->references("id")->on("cities");
            $table->string("address");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('suppliers');
    }
};
