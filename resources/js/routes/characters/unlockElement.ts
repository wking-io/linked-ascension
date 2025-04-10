import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\CharacterController::unlockElement
 * @see app/Http/Controllers/CharacterController.php:150
 * @route /games/{game}/characters/{character}/unlock-element
 */
export const unlockElement = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: unlockElement.url(args, options),
    method: 'post',
})

unlockElement.definition = {
    methods: ['post'],
    url: '\/games\/{game}\/characters\/{character}\/unlock-element',
}

/**
 * @see \App\Http\Controllers\CharacterController::unlockElement
 * @see app/Http/Controllers/CharacterController.php:150
 * @route /games/{game}/characters/{character}/unlock-element
 */
unlockElement.url = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return unlockElement.definition.url
            .replace('{game}', parsedArgs.game.toString())
            .replace('{character}', parsedArgs.character.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\CharacterController::unlockElement
 * @see app/Http/Controllers/CharacterController.php:150
 * @route /games/{game}/characters/{character}/unlock-element
 */
unlockElement.post = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: unlockElement.url(args, options),
    method: 'post',
})

export default unlockElement