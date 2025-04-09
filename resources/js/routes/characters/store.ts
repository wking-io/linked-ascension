import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\CharacterController::store
 * @see app/Http/Controllers/CharacterController.php:102
 * @route /games/{game}
 */
export const store = (args: { game: string | { id: string } } | [game: string | { id: string }] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ['post'],
    url: '\/games\/{game}',
}

/**
 * @see \App\Http\Controllers\CharacterController::store
 * @see app/Http/Controllers/CharacterController.php:102
 * @route /games/{game}
 */
store.url = (args: { game: string | { id: string } } | [game: string | { id: string }] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { game: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { game: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            game: args[0],
        }
    }

    const parsedArgs = {
        game: typeof args.game === 'object'
            ? args.game.id
            : args.game,
    }

    return store.definition.url
            .replace('{game}', parsedArgs.game.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\CharacterController::store
 * @see app/Http/Controllers/CharacterController.php:102
 * @route /games/{game}
 */
store.post = (args: { game: string | { id: string } } | [game: string | { id: string }] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(args, options),
    method: 'post',
})

export default store