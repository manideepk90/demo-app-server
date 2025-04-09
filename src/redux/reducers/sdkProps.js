import {CHANGE_SDK_PROPS_OPTION} from '../actions/ACTIONTYPE';

const initialState = {
  selectedOption: 0,
  selectedJSON: {},
  options: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CHANGE_SDK_PROPS_OPTION:
      return {...state, selectedOption: action.payload};
    default:
      return state;
  }
}
