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
        Schema::create('lib_stations', function (Blueprint $table) {
            $table->id();
            $table->string('address');
            $table->unsignedBigInteger('location_id');
            $table->unsignedBigInteger('lib_station_status_id');
            $table->foreign('location_id')->references('id')->on('locations');
            $table->foreign('lib_station_status_id')->references('id')->on('lib_station_statuses');
            $table->timestamps();
        });
        DB::table('lib_stations')->insert([
            'address' => 'NA',
            'location_id' => 2,
            'lib_station_status_id' => 2
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lib_stations');
    }
};
