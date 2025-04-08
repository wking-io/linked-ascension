import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\UserController::show
 * @see app/Http/Controllers/UserController.php:16
 * @route /users/{user}
 */
export const show = (args: { user: string | { id: string } } | [user: string | { id: string }] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '\/users\/{user}',
}

/**
 * @see \App\Http\Controllers\UserController::show
 * @see app/Http/Controllers/UserController.php:16
 * @route /users/{user}
 */
show.url = (args: { user: string | { id: string } } | [user: string | { id: string }] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { user: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            user: args[0],
        }
    }

    const parsedArgs = {
        user: typeof args.user === 'object'
            ? args.user.id
            : args.user,
    }

    return show.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\UserController::show
 * @see app/Http/Controllers/UserController.php:16
 * @route /users/{user}
 */
show.get = (args: { user: string | { id: string } } | [user: string | { id: string }] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\UserController::show
 * @see app/Http/Controllers/UserController.php:16
 * @route /users/{user}
 */
show.head = (args: { user: string | { id: string } } | [user: string | { id: string }] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

export default show