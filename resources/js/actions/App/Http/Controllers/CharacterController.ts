import { queryParams, type QueryParams } from './../../../../wayfinder'

/**
 * @see \App\Http\Controllers\CharacterController::welcome
 * @see app/Http/Controllers/CharacterController.php:29
 * @route /games/{game}/characters/{character}/welcome
 */
export const welcome = (args: { game: string | number, character: string | { id: string } } | [game: string | number, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: welcome.url(args, options),
    method: 'get',
})

welcome.definition = {
    methods: ['get','head'],
    url: '\/games\/{game}\/characters\/{character}\/welcome',
}

/**
 * @see \App\Http\Controllers\CharacterController::welcome
 * @see app/Http/Controllers/CharacterController.php:29
 * @route /games/{game}/characters/{character}/welcome
 */
welcome.url = (args: { game: string | number, character: string | { id: string } } | [game: string | number, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            game: args[0],
            character: args[1],
        }
    }

    const parsedArgs = {
        game: args.game,
        character: typeof args.character === 'object'
            ? args.character.id
            : args.character,
    }

    return welcome.definition.url
            .replace('{game}', parsedArgs.game.toString())
            .replace('{character}', parsedArgs.character.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\CharacterController::welcome
 * @see app/Http/Controllers/CharacterController.php:29
 * @route /games/{game}/characters/{character}/welcome
 */
welcome.get = (args: { game: string | number, character: string | { id: string } } | [game: string | number, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: welcome.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\CharacterController::welcome
 * @see app/Http/Controllers/CharacterController.php:29
 * @route /games/{game}/characters/{character}/welcome
 */
welcome.head = (args: { game: string | number, character: string | { id: string } } | [game: string | number, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: welcome.url(args, options),
    method: 'head',
})

/**
 * @see \App\Http\Controllers\CharacterController::support
 * @see app/Http/Controllers/CharacterController.php:53
 * @route /games/{game}/characters/{character}/support
 */
export const support = (args: { game: string | number, character: string | { id: string } } | [game: string | number, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
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
 * @see app/Http/Controllers/CharacterController.php:53
 * @route /games/{game}/characters/{character}/support
 */
support.url = (args: { game: string | number, character: string | { id: string } } | [game: string | number, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            game: args[0],
            character: args[1],
        }
    }

    const parsedArgs = {
        game: args.game,
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
 * @see app/Http/Controllers/CharacterController.php:53
 * @route /games/{game}/characters/{character}/support
 */
support.get = (args: { game: string | number, character: string | { id: string } } | [game: string | number, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: support.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\CharacterController::support
 * @see app/Http/Controllers/CharacterController.php:53
 * @route /games/{game}/characters/{character}/support
 */
support.head = (args: { game: string | number, character: string | { id: string } } | [game: string | number, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: support.url(args, options),
    method: 'head',
})

/**
 * @see \App\Http\Controllers\CharacterController::edit
 * @see app/Http/Controllers/CharacterController.php:22
 * @route /games/{game}/characters/{character}/edit
 */
export const edit = (args: { game: string | number, character: string | { id: string } } | [game: string | number, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '\/games\/{game}\/characters\/{character}\/edit',
}

/**
 * @see \App\Http\Controllers\CharacterController::edit
 * @see app/Http/Controllers/CharacterController.php:22
 * @route /games/{game}/characters/{character}/edit
 */
edit.url = (args: { game: string | number, character: string | { id: string } } | [game: string | number, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            game: args[0],
            character: args[1],
        }
    }

    const parsedArgs = {
        game: args.game,
        character: typeof args.character === 'object'
            ? args.character.id
            : args.character,
    }

    return edit.definition.url
            .replace('{game}', parsedArgs.game.toString())
            .replace('{character}', parsedArgs.character.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\CharacterController::edit
 * @see app/Http/Controllers/CharacterController.php:22
 * @route /games/{game}/characters/{character}/edit
 */
edit.get = (args: { game: string | number, character: string | { id: string } } | [game: string | number, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\CharacterController::edit
 * @see app/Http/Controllers/CharacterController.php:22
 * @route /games/{game}/characters/{character}/edit
 */
edit.head = (args: { game: string | number, character: string | { id: string } } | [game: string | number, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
 * @see \App\Http\Controllers\CharacterController::show
 * @see app/Http/Controllers/CharacterController.php:15
 * @route /games/{game}/characters/{character}
 */
export const show = (args: { game: string | number, character: string | { id: string } } | [game: string | number, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '\/games\/{game}\/characters\/{character}',
}

/**
 * @see \App\Http\Controllers\CharacterController::show
 * @see app/Http/Controllers/CharacterController.php:15
 * @route /games/{game}/characters/{character}
 */
show.url = (args: { game: string | number, character: string | { id: string } } | [game: string | number, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            game: args[0],
            character: args[1],
        }
    }

    const parsedArgs = {
        game: args.game,
        character: typeof args.character === 'object'
            ? args.character.id
            : args.character,
    }

    return show.definition.url
            .replace('{game}', parsedArgs.game.toString())
            .replace('{character}', parsedArgs.character.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\CharacterController::show
 * @see app/Http/Controllers/CharacterController.php:15
 * @route /games/{game}/characters/{character}
 */
show.get = (args: { game: string | number, character: string | { id: string } } | [game: string | number, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\CharacterController::show
 * @see app/Http/Controllers/CharacterController.php:15
 * @route /games/{game}/characters/{character}
 */
show.head = (args: { game: string | number, character: string | { id: string } } | [game: string | number, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

/**
 * @see \App\Http\Controllers\CharacterController::claim
 * @see app/Http/Controllers/CharacterController.php:60
 * @route /games/{game}/characters/{character}/claim
 */
export const claim = (args: { game: string | number, character: string | { id: string } } | [game: string | number, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: claim.url(args, options),
    method: 'get',
})

claim.definition = {
    methods: ['get','head'],
    url: '\/games\/{game}\/characters\/{character}\/claim',
}

/**
 * @see \App\Http\Controllers\CharacterController::claim
 * @see app/Http/Controllers/CharacterController.php:60
 * @route /games/{game}/characters/{character}/claim
 */
claim.url = (args: { game: string | number, character: string | { id: string } } | [game: string | number, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            game: args[0],
            character: args[1],
        }
    }

    const parsedArgs = {
        game: args.game,
        character: typeof args.character === 'object'
            ? args.character.id
            : args.character,
    }

    return claim.definition.url
            .replace('{game}', parsedArgs.game.toString())
            .replace('{character}', parsedArgs.character.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\CharacterController::claim
 * @see app/Http/Controllers/CharacterController.php:60
 * @route /games/{game}/characters/{character}/claim
 */
claim.get = (args: { game: string | number, character: string | { id: string } } | [game: string | number, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: claim.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\CharacterController::claim
 * @see app/Http/Controllers/CharacterController.php:60
 * @route /games/{game}/characters/{character}/claim
 */
claim.head = (args: { game: string | number, character: string | { id: string } } | [game: string | number, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: claim.url(args, options),
    method: 'head',
})

/**
 * @see \App\Http\Controllers\CharacterController::store
 * @see app/Http/Controllers/CharacterController.php:73
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
 * @see app/Http/Controllers/CharacterController.php:73
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
 * @see app/Http/Controllers/CharacterController.php:73
 * @route /games/{game}
 */
store.post = (args: { game: string | { id: string } } | [game: string | { id: string }] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(args, options),
    method: 'post',
})

const CharacterController = { welcome, support, edit, show, claim, store }

export default CharacterController