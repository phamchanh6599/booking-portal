import { CREATE_USER } from '../constant/index';

const initialState = { userAuth: {} };

function rootReducer(state = initialState, action) {
  if (action.type === CREATE_USER) {
    const newState = { ...action.payload };
    return newState;
  }
  return state;
}

export default rootReducer;
