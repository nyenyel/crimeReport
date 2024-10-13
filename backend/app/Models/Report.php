<?php

namespace App\Models;

use App\Models\Library\LibCategory;
use App\Models\Library\LibStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Report extends Model
{
    use HasFactory;

    protected $guarded = ['id'];
    protected $fillable = [
        'title',
        'desc',
        'reporter_name',
        'evidence',
        'lib_status_id',
        'lib_category_id',
        'location_id',
    ];

    public function status() : BelongsTo {
        return $this->belongsTo(LibStatus::class, 'lib_status_id');
    }
    public function category() : BelongsTo {
        return $this->belongsTo(LibCategory::class, 'lib_category_id');
    }
    public function location() : BelongsTo {
        return $this->belongsTo(Location::class, 'location_id');
    }
    public function image(): HasMany {
        return $this->hasMany(Evidence::class, 'report_id');
    }
}
