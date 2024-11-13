<?php

namespace App\Models\Library;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LibStationStatus extends Model
{
    use HasFactory;
    protected $guarded =['id'];
    protected $fillable = [
        'desc'
    ];
    public function station(): HasMany {
        return $this->hasMany(LibStation::class, 'lib_station_statuses');
    }
}
