import { queryParams, type QueryParams } from './../../wayfinder'

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

export default claim