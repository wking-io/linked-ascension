import { queryParams, type QueryParams } from './../../../../wayfinder'

/**
 * @see \App\Http\Controllers\UserController::show
 * @see app/Http/Controllers/UserController.php:16
 * @route /user/{user}
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
    url: '\/user\/{user}',
}

/**
 * @see \App\Http\Controllers\UserController::show
 * @see app/Http/Controllers/UserController.php:16
 * @route /user/{user}
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
 * @route /user/{user}
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
 * @route /user/{user}
 */
show.head = (args: { user: string | { id: string } } | [user: string | { id: string }] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

/**
 * @see \App\Http\Controllers\UserController::edit
 * @see app/Http/Controllers/UserController.php:23
 * @route /user/{user}/edit
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
    url: '\/user\/{user}\/edit',
}

/**
 * @see \App\Http\Controllers\UserController::edit
 * @see app/Http/Controllers/UserController.php:23
 * @route /user/{user}/edit
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
 * @route /user/{user}/edit
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
 * @route /user/{user}/edit
 */
edit.head = (args: { user: string | { id: string } } | [user: string | { id: string }] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
 * @see \App\Http\Controllers\UserController::index
 * @see app/Http/Controllers/UserController.php:11
 * @route /users
 */
export const index = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ['get','head'],
    url: '\/users',
}

/**
 * @see \App\Http\Controllers\UserController::index
 * @see app/Http/Controllers/UserController.php:11
 * @route /users
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\UserController::index
 * @see app/Http/Controllers/UserController.php:11
 * @route /users
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\UserController::index
 * @see app/Http/Controllers/UserController.php:11
 * @route /users
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

const UserController = { show, edit, index }

export default UserController