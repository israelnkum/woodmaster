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
        return [
            'id' => $this->id,
            'pallet_number' => $this->pallet_number,
            'wood_count' => $this->woods->count(),
            'thickness' => $this->thickness,
            'species' => $this->species->name,
            'quality' => $this->quality->name,
            'quality_id' => $this->quality_id,
            'date_created' => Carbon::parse($this->created_at)->format('Y-m-d'),
            'species_id' => $this->species_id
        ];
    }
}
