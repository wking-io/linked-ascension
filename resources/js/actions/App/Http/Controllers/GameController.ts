import { queryParams, type QueryParams } from './../../../../wayfinder'

/**
 * @see \App\Http\Controllers\GameController::create
 * @see app/Http/Controllers/GameController.php:38
 * @route /games/create
 */
export const create = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ['get','head'],
    url: '\/games\/create',
}

/**
 * @see \App\Http\Controllers\GameController::create
 * @see app/Http/Controllers/GameController.php:38
 * @route /games/create
 */
create.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return create.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\GameController::create
 * @see app/Http/Controllers/GameController.php:38
 * @route /games/create
 */
create.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\GameController::create
 * @see app/Http/Controllers/GameController.php:38
 * @route /games/create
 */
create.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create.url(options),
    method: 'head',
})

/**
 * @see \App\Http\Controllers\GameController::store
 * @see app/Http/Controllers/GameController.php:43
 * @route /games
 */
export const store = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ['post'],
    url: '\/games',
}

/**
 * @see \App\Http\Controllers\GameController::store
 * @see app/Http/Controllers/GameController.php:43
 * @route /games
 */
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\GameController::store
 * @see app/Http/Controllers/GameController.php:43
 * @route /games
 */
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

/**
 * @see \App\Http\Controllers\GameController::edit
 * @see app/Http/Controllers/GameController.php:56
 * @route /games/{game}/edit
 */
export const edit = (args: { game: string | { id: string } } | [game: string | { id: string }] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '\/games\/{game}\/edit',
}

/**
 * @see \App\Http\Controllers\GameController::edit
 * @see app/Http/Controllers/GameController.php:56
 * @route /games/{game}/edit
 */
edit.url = (args: { game: string | { id: string } } | [game: string | { id: string }] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return edit.definition.url
            .replace('{game}', parsedArgs.game.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\GameController::edit
 * @see app/Http/Controllers/GameController.php:56
 * @route /games/{game}/edit
 */
edit.get = (args: { game: string | { id: string } } | [game: string | { id: string }] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\GameController::edit
 * @see app/Http/Controllers/GameController.php:56
 * @route /games/{game}/edit
 */
edit.head = (args: { game: string | { id: string } } | [game: string | { id: string }] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
 * @see \App\Http\Controllers\GameController::index
 * @see app/Http/Controllers/GameController.php:15
 * @route /games
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
    url: '\/games',
}

/**
 * @see \App\Http\Controllers\GameController::index
 * @see app/Http/Controllers/GameController.php:15
 * @route /games
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\GameController::index
 * @see app/Http/Controllers/GameController.php:15
 * @route /games
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\GameController::index
 * @see app/Http/Controllers/GameController.php:15
 * @route /games
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

/**
 * @see \App\Http\Controllers\GameController::show
 * @see app/Http/Controllers/GameController.php:30
 * @route /games/{game}
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
    url: '\/games\/{game}',
}

/**
 * @see \App\Http\Controllers\GameController::show
 * @see app/Http/Controllers/GameController.php:30
 * @route /games/{game}
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
 * @see app/Http/Controllers/GameController.php:30
 * @route /games/{game}
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
 * @see app/Http/Controllers/GameController.php:30
 * @route /games/{game}
 */
show.head = (args: { game: string | { id: string } } | [game: string | { id: string }] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

const GameController = { create, store, edit, index, show }

export default GameController