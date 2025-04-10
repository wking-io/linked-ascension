<?php

namespace App\States;

use App\Enums\BlessingType;
use App\Models\Blessing;
use Glhd\Bits\Snowflake;
use Illuminate\Support\Collection;
use Thunk\Verbs\State;

class BlessingState extends State
{
    public string $name;
    public string $slug;
    public string $description;
    public BlessingType $type;

    public Collection $character_ids;

    public function __construct()
    {
        $this->character_ids = collect();
    }

    public function model()
    {
        return Blessing::find($this->id);
    }

    public function addCharacter(Snowflake $character_id): void
    {
        $this->character_ids = $this->character_ids->push($character_id);
    }

    public function hasCharacter(Snowflake $character_id): bool
    {
        return $this->character_ids->contains($character_id);
    }
}
