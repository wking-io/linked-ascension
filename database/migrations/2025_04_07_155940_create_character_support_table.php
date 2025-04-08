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
        Schema::create('character_support', function (Blueprint $table) {
            $table->id();
            $table->snowflake('user_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->snowflake('character_id');
            $table->foreign('character_id')->references('id')->on('characters');
            $table->timestamps();

            $table->unique(['user_id', 'character_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('character_support');
    }
};
