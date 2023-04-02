<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pallet extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * @var string[]
     */
    protected $fillable = [
        'pallet_number',
        'thickness',
        'quality_id',
        'species_id',
        'user_id'
    ];

    /**
     * @return BelongsTo
     */
    public function species(): BelongsTo
    {
        return $this->belongsTo(Species::class);
    }

    /**
     * @return BelongsTo
     */
    public function quality(): BelongsTo
    {
        return $this->belongsTo(Quality::class);
    }

    /**
     * @return HasMany
     */
    public function woods(): HasMany
    {
        return $this->hasMany(Wood::class);
    }
}
