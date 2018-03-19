// @flow

export function setActiveRow(payload) {
  return {
    type: 'SET_ACTIVE_ROW',
    payload: {
      selectedRow: payload.index,
      ...payload
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
