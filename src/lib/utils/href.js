import { localizeHref } from '$lib/paraglide/runtime.js'

// paraglide leaves a trailing slash before hashes (/en/#contact); never strip the root slash
export const href = (path) => localizeHref(path).replace(/(.)\/(?=#|$)/, '$1')
