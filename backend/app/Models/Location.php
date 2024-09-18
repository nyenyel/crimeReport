<?php

namespace App\Models;

use App\Models\Library\LibStation;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Location extends Model
{
    use HasFactory;
    protected $guarded =['id'];
    protected $fillable = [
        'long',
        'lat'
    ];
    public function report():BelongsTo{
        return $this->belongsTo(Report::class, 'location_id');
    }
    public function user():BelongsTo{
        return $this->belongsTo(User::class, 'location_id');
    }
    public function station():BelongsTo{
        return $this->belongsTo(LibStation::class, 'location_id');
    }
}
