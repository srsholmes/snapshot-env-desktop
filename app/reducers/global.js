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

const initialState = {
  modal: {
    display: false,
    message: {
      type: 'info',
      content: '',
    },
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
    default:
      return state;
  }
}

const globalActions = {
  openModal,
  closeModal
};

export { globalActions };
