<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('measures_relationships', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('measure_id');
            $table->unsignedBigInteger('related_measure_id');
            $table->foreign('measure_id')->references('id')->on('measures');
            $table->foreign('related_measure_id')->references('id')->on('measures');
            $table->decimal('amount', total: 11, places: 11);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('measures_relationships');
    }
};
