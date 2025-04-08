import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\UserController::edit
 * @see app/Http/Controllers/UserController.php:23
 * @route /users/{user}/edit
 */
export const edit = (args: { user: string | { id: string } } | [user: string | { id: string }] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '\/users\/{user}\/edit',
}

/**
 * @see \App\Http\Controllers\UserController::edit
 * @see app/Http/Controllers/UserController.php:23
 * @route /users/{user}/edit
 */
edit.url = (args: { user: string | { id: string } } | [user: string | { id: string }] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return edit.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\UserController::edit
 * @see app/Http/Controllers/UserController.php:23
 * @route /users/{user}/edit
 */
edit.get = (args: { user: string | { id: string } } | [user: string | { id: string }] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\UserController::edit
 * @see app/Http/Controllers/UserController.php:23
 * @route /users/{user}/edit
 */
edit.head = (args: { user: string | { id: string } } | [user: string | { id: string }] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})

export default edit