import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\GameController::show
 * @see app/Http/Controllers/GameController.php:16
 * @route /game/{game}
 */
export const show = (args: { game: string | { id: string } } | [game: string | { id: string }] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '\/game\/{game}',
}

/**
 * @see \App\Http\Controllers\GameController::show
 * @see app/Http/Controllers/GameController.php:16
 * @route /game/{game}
 */
show.url = (args: { game: string | { id: string } } | [game: string | { id: string }] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return show.definition.url
            .replace('{game}', parsedArgs.game.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\GameController::show
 * @see app/Http/Controllers/GameController.php:16
 * @route /game/{game}
 */
show.get = (args: { game: string | { id: string } } | [game: string | { id: string }] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\GameController::show
 * @see app/Http/Controllers/GameController.php:16
 * @route /game/{game}
 */
show.head = (args: { game: string | { id: string } } | [game: string | { id: string }] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

export default show