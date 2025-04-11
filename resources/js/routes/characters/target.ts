import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\CharacterController::target
 * @see app/Http/Controllers/CharacterController.php:119
 * @route /games/{game}/characters/{character}/target
 */
export const target = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: target.url(args, options),
    method: 'get',
})

target.definition = {
    methods: ['get','head'],
    url: '\/games\/{game}\/characters\/{character}\/target',
}

/**
 * @see \App\Http\Controllers\CharacterController::target
 * @see app/Http/Controllers/CharacterController.php:119
 * @route /games/{game}/characters/{character}/target
 */
target.url = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return target.definition.url
            .replace('{game}', parsedArgs.game.toString())
            .replace('{character}', parsedArgs.character.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\CharacterController::target
 * @see app/Http/Controllers/CharacterController.php:119
 * @route /games/{game}/characters/{character}/target
 */
target.get = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: target.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\CharacterController::target
 * @see app/Http/Controllers/CharacterController.php:119
 * @route /games/{game}/characters/{character}/target
 */
target.head = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: target.url(args, options),
    method: 'head',
})

export default target