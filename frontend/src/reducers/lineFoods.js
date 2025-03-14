import { REQUEST_STATE } from "../constants";


export const initialState = {
  fetchState: REQUEST_STATE.INITIAL,
  postState: REQUEST_STATE.INITIAL,
  lineFoodsSummary: null
};

export const lineFoodsActionTypes = {
  FETCHING: 'FETCHING',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  POSTING: 'POSTING',
  POSTING_SUCCESS: 'POSTING_SUCCESS '
}

export const lineFoodsReducer = (state, action) => {
  switch (action.type) {
    case lineFoodsActionTypes.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING
      };
    case lineFoodsActionTypes.FETCH_SUCCESS:
      return {
        fetchState: REQUEST_STATE.OK,
        lineFoodsSummary: action.payload.lineFoodsSummary
      };
    case lineFoodsActionTypes.POSTING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING
      };
    case lineFoodsActionTypes.POST_SUCCESS:
      return {
        fetchState: REQUEST_STATE.OK,
      };
    default:
      throw new Error();
  }
}