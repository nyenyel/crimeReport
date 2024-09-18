<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=> $this->id,
            'address' => $this->address,
            'location' => new LocationResource($this->whenLoaded('location')),
            'status' => new LibraryResource($this->whenLoaded('status')),
        ];
    }
}
