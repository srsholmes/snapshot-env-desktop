// @flow

export function setActiveRow(id) {
  return {
    type: 'SET_ACTIVE_ROW',
    payload: {
      selectedCommit: id,
    },
  };
}

const sortFunc = (arr, orderBy, order) =>
  order === 'desc'
    ? [...arr].sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
    : [...arr].sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

const sortTableRow = (orderBy, order) => {
  return {
    type: 'SORT_TABLE_ROW',
    payload: {
      orderBy,
      order,
    },
  };
};

const initialState = {
  selectedRow: null,
  selectedCommit: null,
  commits: [], // UI state for repo in the table
};

export default function commitsTable(state = initialState, action) {
  switch (action.type) {
    case 'SORT_TABLE_ROW': {
      const { orderBy, order } = action.payload;
      const sorted = sortFunc(state.commits, orderBy, order);
      return {
        ...state,
        commits: sorted,
      };
    }
    case 'SET_ACTIVE_ROW':
      return {
        ...state,
        selectedCommit: action.payload.selectedCommit,
      };
    case 'SETTING_REPO_INFO':
      return {
        ...state,
        commits: action.payload.commits,
      };
    default:
      return state;
  }
}

const tableActions = {
  sortTableRow,
  setActiveRow,
};

export { tableActions };
