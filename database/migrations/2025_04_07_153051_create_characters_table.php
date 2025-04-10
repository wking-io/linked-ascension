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
        Schema::create('characters', function (Blueprint $table) {
            $table->snowflakeId();
            $table->integer('health');
            $table->timestamp('unlocked_armor_at')->nullable();
            $table->timestamp('unlocked_weapon_at')->nullable();
            $table->timestamp('unlocked_special_at')->nullable();
            $table->string('element')->nullable();
            $table->timestamp('claimed_at')->nullable();
            $table->timestamp('blessing_claimed_at')->nullable();
            $table->timestamp('last_acted_at')->nullable();
            $table->integer('expended_points')->default(0);
            $table->integer('bonus_points')->default(0);
            $table->boolean('is_blessing_active')->default(false);

            $table->snowflake('user_id')->nullable();
            $table->foreign('user_id')->references('id')->on('users');
            $table->snowflake('game_id');
            $table->foreign('game_id')->references('id')->on('games');
            $table->snowflake('blessing_id')->nullable();
            $table->foreign('blessing_id')->references('id')->on('blessings');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('characters');
    }
};
