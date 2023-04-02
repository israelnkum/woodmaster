<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class ApplicationModel extends Model
{

    protected static function booted()
    {
        static::creating(static function ($product) {
            $product->user_id = Auth::id();
        });
    }
}
