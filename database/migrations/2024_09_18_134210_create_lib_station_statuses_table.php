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
        Schema::create('lib_station_statuses', function (Blueprint $table) {
            $table->id();
            $table->string('desc');
            $table->timestamps();
        });
        
        DB::table('lib_station_statuses')->insert([
            ['desc'=> 'Active'],
            ['desc'=> 'Stand By'],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lib_station_statuses');
    }
};
