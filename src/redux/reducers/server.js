import {CHANGE_SERVER_OPTION} from '../actions/ACTIONTYPE';

const initialState = {
  selectedOption: 0,
  selectedJSON: {},
  options: [],
};

export default function (state = initialState, {type, payload}) {
  switch (type) {
    case CHANGE_SERVER_OPTION:
      return {...state, selectedOption: payload};
    default:
      return state;
  }
}
