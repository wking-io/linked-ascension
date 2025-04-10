import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\CharacterController::support
 * @see app/Http/Controllers/CharacterController.php:63
 * @route /games/{game}/characters/{character}/support
 */
export const support = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: support.url(args, options),
    method: 'get',
})

support.definition = {
    methods: ['get','head'],
    url: '\/games\/{game}\/characters\/{character}\/support',
}

/**
 * @see \App\Http\Controllers\CharacterController::support
 * @see app/Http/Controllers/CharacterController.php:63
 * @route /games/{game}/characters/{character}/support
 */
support.url = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return support.definition.url
            .replace('{game}', parsedArgs.game.toString())
            .replace('{character}', parsedArgs.character.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\CharacterController::support
 * @see app/Http/Controllers/CharacterController.php:63
 * @route /games/{game}/characters/{character}/support
 */
support.get = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: support.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\CharacterController::support
 * @see app/Http/Controllers/CharacterController.php:63
 * @route /games/{game}/characters/{character}/support
 */
support.head = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: support.url(args, options),
    method: 'head',
})

export default support