<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReportResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->id,
            'desc' => $this->id,
            'reporter_name' => $this->id,
            'evidence' => $this->id,
            'status' => new LibraryResource($this->whenLoaded('status')),
            'category' => new LibraryResource($this->whenLoaded('category')),
            'location' => new LocationResource($this->whenLoaded('location')),
        ];
    }
}
