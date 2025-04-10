import { queryParams, type QueryParams } from './../../wayfinder'

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

export default create