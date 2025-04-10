<?php

namespace App\Events;

use App\Enums\BlessingType;
use App\Models\Blessing;
use App\States\BlessingState;
use Thunk\Verbs\Attributes\Autodiscovery\StateId;
use Thunk\Verbs\Event;

class AdminCreatedBlessing extends Event
{
    #[StateId(BlessingState::class)]
    public ?int $blessing_id = null;

    public string $name;

    public string $slug;

    public string $description;

    public BlessingType $type;

    public function apply(BlessingState $state)
    {
        $state->name = $this->name;
        $state->slug = $this->slug;
        $state->description = $this->description;
        $state->type = $this->type;
    }

    public function handle(BlessingState $state)
    {
        Blessing::create(
            [
                'id' => $this->blessing_id,
                'name' => $state->name,
                'slug' => $state->slug,
                'description' => $state->description,
                'type' => $state->type,
            ]
        );
    }
}
