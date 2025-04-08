import { queryParams, type QueryParams } from './../../../../wayfinder'

/**
 * @see \App\Http\Controllers\CharacterController::welcome
 * @see app/Http/Controllers/CharacterController.php:31
 * @route /character/{character}/welcome
 */
export const welcome = (args: { character: string | { id: string } } | [character: string | { id: string }] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: welcome.url(args, options),
    method: 'get',
})

welcome.definition = {
    methods: ['get','head'],
    url: '\/character\/{character}\/welcome',
}

/**
 * @see \App\Http\Controllers\CharacterController::welcome
 * @see app/Http/Controllers/CharacterController.php:31
 * @route /character/{character}/welcome
 */
welcome.url = (args: { character: string | { id: string } } | [character: string | { id: string }] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { character: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { character: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            character: args[0],
        }
    }

    const parsedArgs = {
        character: typeof args.character === 'object'
            ? args.character.id
            : args.character,
    }

    return welcome.definition.url
            .replace('{character}', parsedArgs.character.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\CharacterController::welcome
 * @see app/Http/Controllers/CharacterController.php:31
 * @route /character/{character}/welcome
 */
welcome.get = (args: { character: string | { id: string } } | [character: string | { id: string }] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: welcome.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\CharacterController::welcome
 * @see app/Http/Controllers/CharacterController.php:31
 * @route /character/{character}/welcome
 */
welcome.head = (args: { character: string | { id: string } } | [character: string | { id: string }] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: welcome.url(args, options),
    method: 'head',
})

/**
 * @see \App\Http\Controllers\CharacterController::support
 * @see app/Http/Controllers/CharacterController.php:55
 * @route /character/{character}/support
 */
export const support = (args: { character: string | { id: string } } | [character: string | { id: string }] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: support.url(args, options),
    method: 'get',
})

support.definition = {
    methods: ['get','head'],
    url: '\/character\/{character}\/support',
}

/**
 * @see \App\Http\Controllers\CharacterController::support
 * @see app/Http/Controllers/CharacterController.php:55
 * @route /character/{character}/support
 */
support.url = (args: { character: string | { id: string } } | [character: string | { id: string }] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { character: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { character: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            character: args[0],
        }
    }

    const parsedArgs = {
        character: typeof args.character === 'object'
            ? args.character.id
            : args.character,
    }

    return support.definition.url
            .replace('{character}', parsedArgs.character.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\CharacterController::support
 * @see app/Http/Controllers/CharacterController.php:55
 * @route /character/{character}/support
 */
support.get = (args: { character: string | { id: string } } | [character: string | { id: string }] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: support.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\CharacterController::support
 * @see app/Http/Controllers/CharacterController.php:55
 * @route /character/{character}/support
 */
support.head = (args: { character: string | { id: string } } | [character: string | { id: string }] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: support.url(args, options),
    method: 'head',
})

/**
 * @see \App\Http\Controllers\CharacterController::show
 * @see app/Http/Controllers/CharacterController.php:12
 * @route /character/{character}
 */
export const show = (args: { character: string | { id: string } } | [character: string | { id: string }] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '\/character\/{character}',
}

/**
 * @see \App\Http\Controllers\CharacterController::show
 * @see app/Http/Controllers/CharacterController.php:12
 * @route /character/{character}
 */
show.url = (args: { character: string | { id: string } } | [character: string | { id: string }] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { character: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { character: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            character: args[0],
        }
    }

    const parsedArgs = {
        character: typeof args.character === 'object'
            ? args.character.id
            : args.character,
    }

    return show.definition.url
            .replace('{character}', parsedArgs.character.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\CharacterController::show
 * @see app/Http/Controllers/CharacterController.php:12
 * @route /character/{character}
 */
show.get = (args: { character: string | { id: string } } | [character: string | { id: string }] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\CharacterController::show
 * @see app/Http/Controllers/CharacterController.php:12
 * @route /character/{character}
 */
show.head = (args: { character: string | { id: string } } | [character: string | { id: string }] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

/**
 * @see \App\Http\Controllers\CharacterController::claim
 * @see app/Http/Controllers/CharacterController.php:62
 * @route /character/{character}/claim
 */
export const claim = (args: { character: string | { id: string } } | [character: string | { id: string }] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: claim.url(args, options),
    method: 'get',
})

claim.definition = {
    methods: ['get','head'],
    url: '\/character\/{character}\/claim',
}

/**
 * @see \App\Http\Controllers\CharacterController::claim
 * @see app/Http/Controllers/CharacterController.php:62
 * @route /character/{character}/claim
 */
claim.url = (args: { character: string | { id: string } } | [character: string | { id: string }] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { character: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { character: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            character: args[0],
        }
    }

    const parsedArgs = {
        character: typeof args.character === 'object'
            ? args.character.id
            : args.character,
    }

    return claim.definition.url
            .replace('{character}', parsedArgs.character.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\CharacterController::claim
 * @see app/Http/Controllers/CharacterController.php:62
 * @route /character/{character}/claim
 */
claim.get = (args: { character: string | { id: string } } | [character: string | { id: string }] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: claim.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\CharacterController::claim
 * @see app/Http/Controllers/CharacterController.php:62
 * @route /character/{character}/claim
 */
claim.head = (args: { character: string | { id: string } } | [character: string | { id: string }] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: claim.url(args, options),
    method: 'head',
})

/**
 * @see \App\Http\Controllers\CharacterController::edit
 * @see app/Http/Controllers/CharacterController.php:24
 * @route /character/{character}/edit
 */
export const edit = (args: { character: string | { id: string } } | [character: string | { id: string }] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '\/character\/{character}\/edit',
}

/**
 * @see \App\Http\Controllers\CharacterController::edit
 * @see app/Http/Controllers/CharacterController.php:24
 * @route /character/{character}/edit
 */
edit.url = (args: { character: string | { id: string } } | [character: string | { id: string }] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { character: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { character: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            character: args[0],
        }
    }

    const parsedArgs = {
        character: typeof args.character === 'object'
            ? args.character.id
            : args.character,
    }

    return edit.definition.url
            .replace('{character}', parsedArgs.character.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\CharacterController::edit
 * @see app/Http/Controllers/CharacterController.php:24
 * @route /character/{character}/edit
 */
edit.get = (args: { character: string | { id: string } } | [character: string | { id: string }] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\CharacterController::edit
 * @see app/Http/Controllers/CharacterController.php:24
 * @route /character/{character}/edit
 */
edit.head = (args: { character: string | { id: string } } | [character: string | { id: string }] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
 * @see \App\Http\Controllers\CharacterController::create
 * @see app/Http/Controllers/CharacterController.php:19
 * @route /character/create
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
    url: '\/character\/create',
}

/**
 * @see \App\Http\Controllers\CharacterController::create
 * @see app/Http/Controllers/CharacterController.php:19
 * @route /character/create
 */
create.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return create.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\CharacterController::create
 * @see app/Http/Controllers/CharacterController.php:19
 * @route /character/create
 */
create.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\CharacterController::create
 * @see app/Http/Controllers/CharacterController.php:19
 * @route /character/create
 */
create.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create.url(options),
    method: 'head',
})

const CharacterController = { welcome, support, show, claim, edit, create }

export default CharacterController