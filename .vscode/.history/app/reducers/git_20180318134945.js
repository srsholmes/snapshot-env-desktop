// @flow
import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../actions/counter';

const initialState = {
  commits: []
};
export default function git(state = initialState, action) {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return state + 1;
    case DECREMENT_COUNTER:
      return state - 1;
    default:
      return state;
  }
}
