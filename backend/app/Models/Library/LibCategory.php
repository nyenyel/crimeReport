<?php

namespace App\Models\Library;

use App\Models\Report;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LibCategory extends Model
{
    use HasFactory;
    protected $guarded =['id'];
    
    protected $fillable = [
        'desc'
    ];
    public function report(): HasMany {
        return $this->hasMany(Report::class, 'lib_category_id');
    }
}
