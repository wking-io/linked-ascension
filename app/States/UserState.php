<?php

namespace App\States;

use App\Models\User;
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

    public array $supported_character_ids = [];

    public array $character_ids = [];

    public function model()
    {
        return User::find($this->id);
    }

    public function supportedCharacters()
    {
        return collect($this->supported_character_ids)->map(fn($id) => CharacterState::load($id));
    }

    public function characters()
    {
        return collect($this->character_ids)->map(fn($id) => CharacterState::load($id));
    }

    public function hasSupportedCharacter($character_id)
    {
        return collect($this->character_ids)->contains(fn($id) => $id === $character_id);
    }
}
