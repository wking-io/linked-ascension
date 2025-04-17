<?php

namespace App\Events;

use App\Models\User;
use App\States\UserState;
use Thunk\Verbs\Attributes\Autodiscovery\StateId;
use Thunk\Verbs\Event;

class UserAuthenticated extends Event
{
    #[StateId(UserState::class)]
    public ?int $user_id = null;

    public string $name;

    public string $username;

    public string $email;

    public int $provider_id;

    public function apply(UserState $state)
    {
        $state->name = $this->name;
        $state->username = $this->username;
        $state->email = $this->email;
        $state->provider_id = $this->provider_id;
        $state->is_admin = $this->username === "wking-io";
    }

    public function handle(UserState $user)
    {
        User::create(
            [
                'id' => $this->user_id,
                'provider_id' => $user->provider_id,
                'name' => $user->name,
                'username' => $user->username,
                'email' => $user->email,
                'provider' => 'github',
                'is_admin' => $user->is_admin,
            ]
        );
    }
}
