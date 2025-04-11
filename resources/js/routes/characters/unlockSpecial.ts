import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\CharacterController::unlockSpecial
 * @see app/Http/Controllers/CharacterController.php:205
 * @route /games/{game}/characters/{character}/unlock-special
 */
export const unlockSpecial = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: unlockSpecial.url(args, options),
    method: 'post',
})

unlockSpecial.definition = {
    methods: ['post'],
    url: '\/games\/{game}\/characters\/{character}\/unlock-special',
}

/**
 * @see \App\Http\Controllers\CharacterController::unlockSpecial
 * @see app/Http/Controllers/CharacterController.php:205
 * @route /games/{game}/characters/{character}/unlock-special
 */
unlockSpecial.url = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return unlockSpecial.definition.url
            .replace('{game}', parsedArgs.game.toString())
            .replace('{character}', parsedArgs.character.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\CharacterController::unlockSpecial
 * @see app/Http/Controllers/CharacterController.php:205
 * @route /games/{game}/characters/{character}/unlock-special
 */
unlockSpecial.post = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: unlockSpecial.url(args, options),
    method: 'post',
})

export default unlockSpecial