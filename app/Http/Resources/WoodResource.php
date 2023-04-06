<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WoodResource extends JsonResource
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
            'number' => $this->number,
            'log' => $this->palletLog->log_number,
            'sub_log' => $this->sub_log,
            'parcel' => $this->parcel,
            'length' => $this->length,
            'width' => $this->width,
            'sheets' => $this->sheets,
            'square_meter' => $this->square_meter,
            'pallet_log_id' => $this->pallet_log_id,
        ];
    }
}
