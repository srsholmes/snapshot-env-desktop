// @flow

const openModal = () => async (dispatch: action => void) => {
  return dispatch({
    type: 'OPEN_GLOABL_MODAL',
    payload: {
      content: 'Hello Simon',
    },
  });
};

const closeModal = () => async (dispatch: action => void) => {
  return dispatch({
    type: 'CLOSE_GLOABL_MODAL',
    payload: {
      content: 'Hello Simon',
    },
  });
};

const setSnapshotMessage = (msg, progress) => async (
  dispatch: action => void
) => {
  return dispatch({
    type: 'SET_GLOBAL_SNAPSHOT_MESSAGE',
    payload: {
      message: msg,
      progress,
    },
  });
};

const initialState = {
  modal: {
    display: false,
    message: {
      type: 'info',
      content: '',
    },
  },
  snapshot: {
    taskLength: 6,
    progress: 0,
    currentTask: 'Doing something',
  },
};

export default function global(state = initialState, action) {
  switch (action.type) {
    case 'OPEN_GLOABL_MODAL':
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
    case 'CLOSE_GLOABL_MODAL':
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
  setSnapshotMessage,
};

export { globalActions };
