<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::table('users', function (Blueprint $table) {
            $table->boolean("code_verificated")->default(false)->nullable();
            $table->datetime('code_mail_expire_at', precision: 0)->nullable()->default(null);
            $table->integer("code_mail")->nullable()->default(null);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('code_mail');
            $table->dropColumn('code_mail_expire_at');
            $table->dropColumn("code_verificated")->default(false);
        });
    }
};
