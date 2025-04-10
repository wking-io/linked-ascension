import create from './create'
import store from './store'
import show from './show'
import claim from './claim'
import { queryParams, type QueryParams } from './../../wayfinder'

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

const blessings = {
    index, 
    create, 
    store, 
    show, 
    claim,
}

export default blessings