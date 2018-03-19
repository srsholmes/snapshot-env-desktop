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
  selectedRow: null
};

export default function commitsTable(state = initialState, action) {
  switch (action.type) {
    case 'SET_ACTIVE_ROW':
      return { ...state, selectedRow: action.payload.row };
    default:
      return state;
  }
}

const tableActions = {
  setActiveRow
};

export { tableActions };
