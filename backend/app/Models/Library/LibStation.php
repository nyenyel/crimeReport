<?php

namespace App\Models\Library;

use App\Models\Location;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LibStation extends Model
{
    use HasFactory;
    protected $guarded =['id'];
    protected $fillable = [
        'address',
        'location_id',
        'lib_station_status_id',
    ];
    public function location ():BelongsTo{
        return $this->belongsTo(Location::class, 'location_id');
    }
    public function status () :BelongsTo {
        return $this->belongsTo(LibStationStatus::class, 'lib_station_status_id');
    }
    public function user(): HasMany{
        return $this->hasMany(User::class, 'lib_station_id');
    }
}
