<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Models\Library\LibGender;
use App\Models\Library\LibRank;
use App\Models\Library\LibRole;
use App\Models\Library\LibStation;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable,HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'username',
        'email',
        'password',
        'first_name',
        'last_name',
        'middle_name',
        'phone_no',
        'badge_no',
        'location_id',
        'lib_role_id',
        'lib_gender_id',
        'lib_station_id',
        'lib_rank_id',
        'isVerified',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function location() :BelongsTo{
        return $this->belongsTo(Location::class, 'location_id');
    }
    public function role() :BelongsTo{
        return $this->belongsTo(LibRole::class, 'lib_role_id');
    }
    public function gender() :BelongsTo{
        return $this->belongsTo(LibGender::class, 'lib_gender_id');
    }
    public function station() :BelongsTo{
        return $this->belongsTo(LibStation::class, 'lib_station_id');
    }
    public function rank() :BelongsTo{
        return $this->belongsTo(LibRank::class, 'lib_rank_id');
    }
    public function dispatch(): HasMany {
        return $this->hasMany(Report::class, 'dispatch_user');
    }
    public function resolved(): HasMany {
        return $this->hasMany(Report::class, 'dispatch_user')->where('lib_status_id', 5);
    }
    public function unResolved(): HasMany {
        return $this->hasMany(Report::class, 'dispatch_user')->where('lib_status_id', 4);
    }
    public function reports(): HasMany {
        return $this->hasMany(Report::class, 'reporter_account');
    }
}
