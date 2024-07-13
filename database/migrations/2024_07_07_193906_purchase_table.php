<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void{
        Schema::create('purchases', function (Blueprint $table) {
            $table->id();
            $table->integer("number")->nullable(false);
            $table->decimal("amount", total:20, places: 4);
            $table->integer("product_count");
            $table->integer("quantity_total");
            $table->unsignedBigInteger('supplier_id')->nullable(false);
            $table->foreign("supplier_id")->references("id")->on("suppliers");
            $table->timestamps();
            $table->unsignedBigInteger('user_id')->nullable(false);
            $table->foreign("user_id")->references("id")->on("users");
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void{

        Schema::dropIfExists('purchases');
    }
};
