<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Wood extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * @var array
     */
    protected $fillable = [
        'number',
        'log',
        'sub_log',
        'parcel',
        'length',
        'width',
        'sheets',
        'square_meter',
        'pallet_id',
        'user_id'
    ];
}
