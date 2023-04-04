<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class PalletLog extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
      'pallet_id',
      'user_id',
      'log_number'
    ];

    public function pallet(): BelongsTo
    {
        return $this->belongsTo(Pallet::class);
    }
}
