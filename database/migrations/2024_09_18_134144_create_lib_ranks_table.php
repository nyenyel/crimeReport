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
        Schema::create('lib_ranks', function (Blueprint $table) {
            $table->id();
            $table->string('desc');
            $table->timestamps();
        });
        DB::table('lib_ranks')->insert([
            ['desc' => 'Police General (PGEN)'],
            ['desc' => 'Police Lieutenant General (PLTGEN)'],
            ['desc' => 'Police Major General (PMGEN)'],
            ['desc' => 'Police Brigadier General (PBGEN)'],
            ['desc' => 'Police Colonel (PCOL)'],
            ['desc' => 'Police Lieutenant Colonel (PLTCOL)'],
            ['desc' => 'Police Major (PMAJ)'],
            ['desc' => 'Police Captain (PCPT)'],
            ['desc' => 'Police Lieutenant (PLT)'],
            ['desc' => 'Police Executive Master Sergeant (PEMS)'],
            ['desc' => 'Police Chief Master Sergeant (PCMS)'],
            ['desc' => 'Police Senior Master Sergeant (PSMS)'],
            ['desc' => 'Police Master Sergeant (PMSg)'],
            ['desc' => 'Police Staff Sergeant (PSSg)'],
            ['desc' => 'Police Corporal (PCpl)'],
            ['desc' => 'Patrolman/Patrolwoman (Pat)']
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lib_ranks');
    }
};
