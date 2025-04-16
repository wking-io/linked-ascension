<?php

namespace App\Policies;

use App\Models\Blessing;
use App\Models\Character;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class BlessingPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can claim the blessing for the character.
     */
    public function claim(User $user, Blessing $blessing, Character $character): bool
    {
        // User must own the character and the character must not have a blessing yet.
        return $character->user_id === $user->id && $character->blessing_id === null;
    }

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true; // Allow any authenticated user to view the list
    }

    // Add other policy methods like view, update, delete as needed.
}
