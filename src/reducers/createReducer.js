/**
 * 创建 reducer 的 模板
 * http://cn.redux.js.org/docs/recipes/reducers/RefactoringReducersExample.html
 * @param {*} initialState
 * @param {*} handlers
 */
function createReducer (initialState, handlers) {
    return function reducer (state = initialState, action) {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action);
        } else {
            return state;
        }
    }
}

export default createReducer;