const userReducer = (state = '', action) => {
    switch(action.type) {
        case 'SET_USER':
            return action.user
        default:
            return state
    }
}

export const setUserGlobal = user => {
    return {
        type:'SET_USER',
        user,
    }
}


export default userReducer