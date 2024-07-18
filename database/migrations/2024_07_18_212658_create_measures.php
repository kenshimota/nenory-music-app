<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('measures', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->string("abreviated");
            $table->unsignedBigInteger("measure_type_id");
            $table->foreign("measure_type_id")->references("id")->on("measure_types");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('measures');
    }
};
