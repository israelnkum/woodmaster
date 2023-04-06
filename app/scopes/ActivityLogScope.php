<?php

namespace App\scopes;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;

class ActivityLogScope implements Scope
{
  /**
   * Apply the scope to a given Eloquent query builder.
   *
   * @param Builder $builder
   * @param Model $model
   * @return void
   */
  public function apply(Builder $builder, Model $model): void
  {
    $builder->orderBy('created_at', 'asc');
  }
}
