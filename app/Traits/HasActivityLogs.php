<?php

namespace App\Traits;

use App\Models\ActivityLog;
use Illuminate\Database\Eloquent\Relations\MorphMany;

trait HasActivityLogs
{
  public function activityLogs(): MorphMany
  {
    return $this->morphMany(ActivityLog::class, 'loggable');
  }
}
