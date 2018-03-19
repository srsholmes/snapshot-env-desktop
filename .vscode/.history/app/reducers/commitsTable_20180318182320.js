// @flow

export function setActiveRow(i) {
  return {
    type: 'SET_ACTIVE_ROW',
    payload: {
      row: i
    }
  };
}

const initialState = {
  row: null
};

export default function commitsTable(state = initialState, action) {
  switch (action.type) {
    case 'SET_ACTIVE_ROW':
      return { ...state, row: action.payload.row };
    default:
      return state;
  }
}

const projectActions = {
  setActiveRow
};

export { projectActions };
