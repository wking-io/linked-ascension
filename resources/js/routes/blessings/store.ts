import { queryParams, type QueryParams } from './../../wayfinder'

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

export default store