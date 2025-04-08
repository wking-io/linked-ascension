import { queryParams, type QueryParams } from './../../wayfinder'

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

export default support