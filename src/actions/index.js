export const TOGGLE_CATEGORY = 'TOGGLE_CATEGORY'
export const toggleCategory = (id,status)  => {
    return {
        type: 'TOGGLE_CATEGORY',
        id,
        status
    }
}

export const TOGGLE_ALL_CATEGORIES = 'TOGGLE_ALL_CATEGORIES'
export const toggleAllCategories = (status) => {
    return {
        type: 'TOGGLE_ALL',
        status
    }
}
