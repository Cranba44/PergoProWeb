import { LOGIN, GET_USER_BY_ID} from "./UserActions";

const initialState = {
    user: undefined
}


const userReducer = (state=initialState, action) => {
    switch(action.type) {
        case LOGIN: 
        return {
            ...state,
            user: action.payload.user
        }
        case GET_USER_BY_ID:
            return {
                ...state,
                user:action.payload.user
            }
        default: 
        return state
    }
}


export default userReducer;