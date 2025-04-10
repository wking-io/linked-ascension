import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\CharacterController::unlockArmor
 * @see app/Http/Controllers/CharacterController.php:171
 * @route /games/{game}/characters/{character}/unlock-armor
 */
export const unlockArmor = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: unlockArmor.url(args, options),
    method: 'post',
})

unlockArmor.definition = {
    methods: ['post'],
    url: '\/games\/{game}\/characters\/{character}\/unlock-armor',
}

/**
 * @see \App\Http\Controllers\CharacterController::unlockArmor
 * @see app/Http/Controllers/CharacterController.php:171
 * @route /games/{game}/characters/{character}/unlock-armor
 */
unlockArmor.url = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            game: args[0],
            character: args[1],
        }
    }

    const parsedArgs = {
        game: typeof args.game === 'object'
            ? args.game.id
            : args.game,
        character: typeof args.character === 'object'
            ? args.character.id
            : args.character,
    }

    return unlockArmor.definition.url
            .replace('{game}', parsedArgs.game.toString())
            .replace('{character}', parsedArgs.character.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\CharacterController::unlockArmor
 * @see app/Http/Controllers/CharacterController.php:171
 * @route /games/{game}/characters/{character}/unlock-armor
 */
unlockArmor.post = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: unlockArmor.url(args, options),
    method: 'post',
})

export default unlockArmor