<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PalletResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array
     */
    public function toArray($request): array
    {
        $date = $this->custom_created_date ?? $this->created_at;
        return [
            'id' => $this->id,
            'pallet_number' => $this->pallet_number,
            'wood_count' => $this->woods->count(),
            'total_sheets' => $this->woods->sum('sheets'),
            'square_meter' => round($this->woods->sum('square_meter'), 2),
            'logs_count' => $this->logs->count(),
            'thickness' => $this->thickness,
            'species' => $this->species->name,
            'quality' => $this->quality->name,
            'quality_id' => $this->quality_id,
            'pallet_logs' => $this->logs,
            'custom_created_date' => Carbon::parse($date)->format('Y-m-d'),
            'species_id' => $this->species_id
        ];
    }
}
