<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AttackableCharacterResource extends JsonResource
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
            'name' => $this->name,
            'hearts' => $this->hearts,
            'element' => $this->element,
            'armor' => $this->armor,
            'weapon' => $this->weapon,
            'special' => $this->special,
            'blessing_type' => $this->blessing?->type,
            'support_points' => $this->state()->supportPoints(),
        ];
    }
}
