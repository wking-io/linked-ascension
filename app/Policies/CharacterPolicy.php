<?php

namespace App\Policies;

use App\Models\Character;
use App\Models\User;

class CharacterPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        // Typically used for index pages, allow if logged in
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Character $character): bool
    {
        // Allow any authenticated user to view a character profile
        return true;
    }

    /**
     * Determine whether the user can claim the character.
     * This requires the character to be unowned AND the user not to own another character in the same game.
     */
    public function claim(User $user, Character $character): bool
    {
        return $character->user_id === null && ! $character->game->characters()->where('user_id', $user->id)->exists();
    }

    /**
     * Determine whether the user can update the model (e.g., for admin edits).
     * For now, let's assume only admins can edit via the edit route.
     * We can refine this if user-updatable fields exist.
     */
    public function update(User $user, Character $character): bool
    {
        return true;
    }

    /**
     * Determine whether the user can initiate an attack from this character.
     */
    public function attack(User $user, Character $character): bool
    {
        return $character->user_id === $user->id;
    }

    /**
     * Determine whether the user can upgrade the character.
     */
    public function upgrade(User $user, Character $character): bool
    {
        return $character->user_id === $user->id;
    }

    /**
     * Determine whether the user can unlock abilities (element, armor, weapon, special).
     */
    public function unlock(User $user, Character $character): bool
    {
        return $character->user_id === $user->id;
    }

    /**
     * Determine whether the user can heal the character's heart.
     */
    public function heal(User $user, Character $character): bool
    {
        return $character->user_id === $user->id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Character $character): bool
    {
        // Only allow deletion if owned by user OR if user is admin?
        // Adjust as needed.
        return $character->user_id === $user->id || $user->isAdmin();
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Character $character): bool
    {
        return $user->isAdmin(); // Typically admin action
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Character $character): bool
    {
        return $user->isAdmin(); // Typically admin action
    }
}
