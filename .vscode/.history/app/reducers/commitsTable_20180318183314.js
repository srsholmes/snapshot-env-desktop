// @flow

export function setActiveRow(payload) {
  console.log({ payload });
  return {
    type: 'SET_ACTIVE_ROW',
    payload: {
      selectedRow: payload.row.index,
      row: payload.row.row
    }
  };
}

const initialState = {
  selectedRow: null
};

export default function commitsTable(state = initialState, action) {
  switch (action.type) {
    case 'SET_ACTIVE_ROW':
      return { ...state, selectedRow: action.payload.selectedRow, row: action.payload.row };
    default:
      return state;
  }
}

const tableActions = {
  setActiveRow
};

export { tableActions };
