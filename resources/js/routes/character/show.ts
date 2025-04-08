import { queryParams, type QueryParams } from './../../wayfinder'

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

export default show