export const LOGIN = 'LOGIN';
export const GET_USER_BY_ID= 'GET_USER_BY_ID';


export const doLoginActions = (payload) => {
    return {
        type: LOGIN,
        payload
    }
}

export const loadUser = (payload) => {
    return{
        type: GET_USER_BY_ID,
        payload
    }
}