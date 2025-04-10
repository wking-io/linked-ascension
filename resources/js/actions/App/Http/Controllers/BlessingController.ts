import { queryParams, type QueryParams } from './../../../../wayfinder'

/**
 * @see \App\Http\Controllers\BlessingController::index
 * @see app/Http/Controllers/BlessingController.php:19
 * @route /blessings
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
    url: '\/blessings',
}

/**
 * @see \App\Http\Controllers\BlessingController::index
 * @see app/Http/Controllers/BlessingController.php:19
 * @route /blessings
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\BlessingController::index
 * @see app/Http/Controllers/BlessingController.php:19
 * @route /blessings
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\BlessingController::index
 * @see app/Http/Controllers/BlessingController.php:19
 * @route /blessings
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

/**
 * @see \App\Http\Controllers\BlessingController::create
 * @see app/Http/Controllers/BlessingController.php:35
 * @route /blessings/create
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
    url: '\/blessings\/create',
}

/**
 * @see \App\Http\Controllers\BlessingController::create
 * @see app/Http/Controllers/BlessingController.php:35
 * @route /blessings/create
 */
create.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return create.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\BlessingController::create
 * @see app/Http/Controllers/BlessingController.php:35
 * @route /blessings/create
 */
create.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\BlessingController::create
 * @see app/Http/Controllers/BlessingController.php:35
 * @route /blessings/create
 */
create.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create.url(options),
    method: 'head',
})

/**
 * @see \App\Http\Controllers\BlessingController::store
 * @see app/Http/Controllers/BlessingController.php:42
 * @route /blessings
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
    url: '\/blessings',
}

/**
 * @see \App\Http\Controllers\BlessingController::store
 * @see app/Http/Controllers/BlessingController.php:42
 * @route /blessings
 */
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\BlessingController::store
 * @see app/Http/Controllers/BlessingController.php:42
 * @route /blessings
 */
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

/**
 * @see \App\Http\Controllers\BlessingController::show
 * @see app/Http/Controllers/BlessingController.php:26
 * @route /games/{game}/characters/{character}/blessings/{blessing}
 */
export const show = (args: { game: string | { id: string }, character: string | { id: string }, blessing: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }, blessing: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '\/games\/{game}\/characters\/{character}\/blessings\/{blessing}',
}

/**
 * @see \App\Http\Controllers\BlessingController::show
 * @see app/Http/Controllers/BlessingController.php:26
 * @route /games/{game}/characters/{character}/blessings/{blessing}
 */
show.url = (args: { game: string | { id: string }, character: string | { id: string }, blessing: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }, blessing: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            game: args[0],
            character: args[1],
            blessing: args[2],
        }
    }

    const parsedArgs = {
        game: typeof args.game === 'object'
            ? args.game.id
            : args.game,
        character: typeof args.character === 'object'
            ? args.character.id
            : args.character,
        blessing: typeof args.blessing === 'object'
            ? args.blessing.id
            : args.blessing,
    }

    return show.definition.url
            .replace('{game}', parsedArgs.game.toString())
            .replace('{character}', parsedArgs.character.toString())
            .replace('{blessing}', parsedArgs.blessing.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\BlessingController::show
 * @see app/Http/Controllers/BlessingController.php:26
 * @route /games/{game}/characters/{character}/blessings/{blessing}
 */
show.get = (args: { game: string | { id: string }, character: string | { id: string }, blessing: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }, blessing: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\BlessingController::show
 * @see app/Http/Controllers/BlessingController.php:26
 * @route /games/{game}/characters/{character}/blessings/{blessing}
 */
show.head = (args: { game: string | { id: string }, character: string | { id: string }, blessing: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }, blessing: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

/**
 * @see \App\Http\Controllers\BlessingController::claim
 * @see app/Http/Controllers/BlessingController.php:61
 * @route /games/{game}/characters/{character}/blessings/{blessing}/claim
 */
export const claim = (args: { game: string | { id: string }, character: string | { id: string }, blessing: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }, blessing: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: claim.url(args, options),
    method: 'post',
})

claim.definition = {
    methods: ['post'],
    url: '\/games\/{game}\/characters\/{character}\/blessings\/{blessing}\/claim',
}

/**
 * @see \App\Http\Controllers\BlessingController::claim
 * @see app/Http/Controllers/BlessingController.php:61
 * @route /games/{game}/characters/{character}/blessings/{blessing}/claim
 */
claim.url = (args: { game: string | { id: string }, character: string | { id: string }, blessing: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }, blessing: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            game: args[0],
            character: args[1],
            blessing: args[2],
        }
    }

    const parsedArgs = {
        game: typeof args.game === 'object'
            ? args.game.id
            : args.game,
        character: typeof args.character === 'object'
            ? args.character.id
            : args.character,
        blessing: typeof args.blessing === 'object'
            ? args.blessing.id
            : args.blessing,
    }

    return claim.definition.url
            .replace('{game}', parsedArgs.game.toString())
            .replace('{character}', parsedArgs.character.toString())
            .replace('{blessing}', parsedArgs.blessing.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\BlessingController::claim
 * @see app/Http/Controllers/BlessingController.php:61
 * @route /games/{game}/characters/{character}/blessings/{blessing}/claim
 */
claim.post = (args: { game: string | { id: string }, character: string | { id: string }, blessing: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }, blessing: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: claim.url(args, options),
    method: 'post',
})

const BlessingController = { index, create, store, show, claim }

export default BlessingController