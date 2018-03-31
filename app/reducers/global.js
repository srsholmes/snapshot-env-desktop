// @flow

const SNAPSHOT_TASKS_LENGTH = 11;

const openModal = () => async (dispatch: action => void) => {
  return dispatch({
    type: 'OPEN_GLOBAL_MODAL',
    payload: {
      content: 'Hello Simon',
    },
  });
};

const closeModal = () => async (dispatch: action => void) => {
  return dispatch({
    type: 'CLOSE_GLOBAL_MODAL',
    payload: {
      content: 'Hello Simon',
    },
  });
};

const setSnapshotMessage = (msg, progress) => async (dispatch, getState) => {
  // console.log(getState());
  return dispatch({
    type: 'SET_GLOBAL_SNAPSHOT_MESSAGE',
    payload: {
      message: msg,
      progress,
    },
  });
};

const toggleDrawer = () => async (dispatch: action, getState) => {
  const state = getState();
  const { open } = state.global.drawer;

  return dispatch({
    type: open ? 'CLOSE_DRAWER' : 'OPEN_DRAWER',
  });
};

const initialState = {
  drawer: {
    open: false,
  },
  modal: {
    display: false,
    message: {
      type: 'info',
      content: '',
    },
  },
  snapshot: {
    taskLength: SNAPSHOT_TASKS_LENGTH,
    progress: 0,
    currentTask: 'Doing something',
  },
};

export default function global(state = initialState, action) {
  switch (action.type) {
    case 'OPEN_DRAWER': {
      return { ...state, drawer: { open: true } };
    }
    case 'CLOSE_DRAWER': {
      return { ...state, drawer: { open: false } };
    }
    case 'OPEN_GLOBAL_MODAL':
      return {
        ...state,
        modal: {
          ...state.modal,
          display: true,
          message: {
            type: 'info',
            content: action.payload.content,
          },
        },
      };
    case 'CLOSE_GLOBAL_MODAL':
      return {
        ...state,
        modal: {
          ...state.modal,
          display: false,
        },
      };
    case 'SET_GLOBAL_SNAPSHOT_MESSAGE': {
      return {
        ...state,
        snapshot: {
          ...state.snapshot,
          progress: action.payload.progress,
          currentTask: action.payload.message,
        },
      };
    }
    default:
      return state;
  }
}

const globalActions = {
  openModal,
  closeModal,
  toggleDrawer,
  setSnapshotMessage,
};

export { globalActions };
