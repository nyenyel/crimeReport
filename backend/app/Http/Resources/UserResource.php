<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'username' => $this->username,
            'email' => $this->email,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'middle_name' => $this->middle_name,
            'phone_no' => $this->phone_no,
            'badge_no' => $this->badge_no,
            'isVerified' => $this->isVerified,
            'location' => new LocationResource($this->whenLoaded('location')),
            'role' => new LibraryResource($this->whenLoaded('role')),
            'gender' => new LibraryResource($this->whenLoaded('gender')),
            'station' => new StationResource($this->whenLoaded('station')),
            'rank' => new LibraryResource($this->whenLoaded('rank')),
        ];
    }
}
