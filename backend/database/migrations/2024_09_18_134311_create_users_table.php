<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('username');
            $table->string('email')->unique();
            $table->string('password');
            $table->timestamp('email_verified_at')->nullable();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('middle_name');
            $table->string('phone_no');
            $table->string('badge_no');
            $table->unsignedBigInteger('location_id');
            $table->unsignedBigInteger('lib_gender_id');
            $table->unsignedBigInteger('lib_station_id');
            $table->unsignedBigInteger('lib_role_id');
            $table->unsignedBigInteger('lib_rank_id');
            $table->foreign('location_id')->references('id')->on('locations');
            $table->foreign('lib_gender_id')->references('id')->on('lib_genders');
            $table->foreign('lib_station_id')->references('id')->on('lib_stations');
            $table->foreign('lib_role_id')->references('id')->on('lib_roles');
            $table->foreign('lib_rank_id')->references('id')->on('lib_ranks');
            $table->rememberToken();
            $table->timestamps();
        });

        DB::table('users')->insert([
            'username' => 'admin',
            'email' => 'admin@example.com',
            'password' => 'admin123',
            'first_name' => 'Super',
            'last_name' => 'Admin',
            'middle_name' => 'PNP',
            'phone_no' => '09222222222',
            'badge_no' => '492932942859347',
            'location_id' => 1,
            'lib_role_id' => 1,
            'lib_gender_id' => 1,
            'lib_station_id' => 1,
            'lib_rank_id' => 1,
            
        ]);

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
