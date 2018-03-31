// @flow

export const setActiveRow = id => async (dispatch: action, getState: any) => {
  const state = getState();
  const { selected } = state.commitsTable;
  const isSelected = selected.find(x => x === id);
  const arr = isSelected ? [] : [id];

  return dispatch({
    type: 'COMMITS_TABLE_SET_ACTIVE_ROW',
    payload: {
      selectedCommit: id,
      selected: arr,
    },
  });
};

const sortFunc = (arr, orderBy, order) =>
  order === 'desc'
    ? [...arr].sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
    : [...arr].sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

const sortTableRow = val => async (dispatch: action, getState: any) => {
  const state = getState();
  const { orderBy, order } = state.commitsTable;
  return dispatch({
    type: 'COMMITS_TABLE_SORT_TABLE_ROW',
    payload: {
      orderBy: val,
      order: orderBy === val && order === 'desc' ? 'asc' : 'desc',
    },
  });
};

const changeRowsPerPage = n => {
  return {
    type: 'COMMITS_TABLE_CHANGE_ROWS_PAGE',
    payload: {
      rowsPerPage: n,
    },
  };
};
const changePage = page => {
  return {
    type: 'COMMITS_TABLE_CHANGE_PAGE',
    payload: {
      page,
    },
  };
};

const getSearchFilter = (val, arr) => {
  const copy = [...arr];
  const res = copy.reduce((acc, curr) => {
    const keysToSearch = Object.keys(curr);
    const findResult = keysToSearch.some(x =>
      curr[x].toLowerCase().includes(val)
    );

    return findResult ? [...acc, curr] : acc;
  }, []);

  return res;
};

const setCommitSearchValue = val => async (dispatch: action, getState: any) => {
  const state = getState();
  const { commits } = state.git; // Get them from git here, as the returned UI will be a filtered array, so we wont be able to search it again properly if cleared

  return dispatch({
    type: 'COMMITS_TABLE_SET_SEARCH_VALUE',
    payload: {
      searchValue: val,
      commits: getSearchFilter(val, commits),
    },
  });
};

const initialState = {
  filter: null,
  selectedRow: null,
  selectedCommit: null,
  searchValue: '',
  commits: [], // UI state for repo in the table
  order: 'asc',
  orderBy: 'commitDate',
  selected: [],
  page: 0,
  rowsPerPage: 10,
};

export default function commitsTable(state = initialState, action) {
  switch (action.type) {
    case 'COMMITS_TABLE_SORT_TABLE_ROW': {
      const { orderBy, order } = action.payload;
      const sorted = sortFunc(state.commits, orderBy, order);
      return {
        ...state,
        orderBy,
        order,
        commits: sorted,
      };
    }
    case 'CLOSE_SEARCH':
    case 'COMMITS_TABLE_CHANGE_PAGE':
    case 'COMMITS_TABLE_CHANGE_ROWS_PAGE':
    case 'COMMITS_TABLE_SET_ACTIVE_ROW':
    case 'COMMITS_TABLE_SET_SEARCH_VALUE':
    case 'SETTING_REPO_INFO':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}

const tableActions = {
  changePage,
  changeRowsPerPage,
  setActiveRow,
  setCommitSearchValue,
  sortTableRow,
};

export { tableActions };
