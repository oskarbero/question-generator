export default (state = 0, action) => {
    switch(action.type) {
        case 'CHANGE_MAIN_MENU_ITEM_SELECTED':
            return Object.assign({}, state, action.itemSelected);
        default:
            return state;
    }
}