<?php

namespace App\States;

use App\Models\User;
use Glhd\Bits\Snowflake;
use Illuminate\Support\Collection;
use Thunk\Verbs\State;

class UserState extends State
{
    public string $name;

    public string $username;

    public string $email;

    public string $provider;

    public int $provider_id;

    public bool $is_admin;

    public Collection $supported_character_ids;

    public Collection $character_ids;

    public function __construct()
    {
        $this->character_ids = collect();
        $this->supported_character_ids = collect();
    }

    public function addCharacter(Snowflake $character_id): void
    {
        $this->character_ids = $this->character_ids->push($character_id);
    }

    public function hasCharacter(Snowflake $character_id): bool
    {
        return $this->character_ids->contains(fn($id) => $id->is($character_id));
    }

    public function model()
    {
        return User::find($this->id);
    }

    public function supportedCharacters()
    {
        return $this->supported_character_ids->map(fn($id) => CharacterState::load($id));
    }

    public function characters()
    {
        return $this->character_ids->map(fn($id) => CharacterState::load($id));
    }

    public function hasSupportedCharacter(Snowflake $character_id)
    {
        return $this->supported_character_ids->contains(fn($id) => $id->is($character_id));
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'username' => $this->username,
            'email' => $this->email,
        ];
    }
}
