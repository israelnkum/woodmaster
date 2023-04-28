<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Wood extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * @var array
     */
    protected $fillable = [
        'number',
        'pallet_log_id',
        'sub_log',
        'parcel',
        'length',
        'width',
        'sheets',
        'square_meter',
        'user_id'
    ];

    protected $casts = [
        'square_meter' => 'float',
        'sheets' => 'integer',
    ];

    /**
     * @return BelongsTo
     */
    public function palletLog(): BelongsTo
    {
        return $this->belongsTo(PalletLog::class);
    }
}
