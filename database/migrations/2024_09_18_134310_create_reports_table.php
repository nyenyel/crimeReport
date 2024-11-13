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
        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('desc');
            $table->string('reporter_name');
            $table->string('evidence')->nullable();
            $table->timestamp('date_time');
            $table->unsignedBigInteger('lib_status_id');
            $table->unsignedBigInteger('lib_category_id');
            $table->unsignedBigInteger('location_id');
            $table->foreign('lib_status_id')->references('id')->on('lib_statuses');
            $table->foreign('lib_category_id')->references('id')->on('lib_categories');
            $table->foreign('location_id')->references('id')->on('locations');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};
