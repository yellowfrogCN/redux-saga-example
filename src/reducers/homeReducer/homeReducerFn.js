export const testSuccess = (state, action) => {
    const { avatar_url, bio, name } = action.payload;
    const newState = {
        ...state,
        avatar_url,
        description: bio,
        name
    }
    return newState;
}

export const changeLoading = (state, action) => {
    const loading = action.payload;
    const newState = {
        ...state,
        loading
    }
    return newState;
}