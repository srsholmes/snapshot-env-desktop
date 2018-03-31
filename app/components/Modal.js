import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

class Modal extends React.Component {
  handleClickOpen = () => {
    const { openModal } = this.props.actions;
    openModal();
  };

  handleClose = () => {
    const { closeModal } = this.props.actions;
    closeModal();
  };

  render() {
    const { global } = this.props;
    const { modal } = global;
    return (
      <div>
        <Button onClick={this.handleClickOpen}>Open alert dialog</Button>
        <Dialog
          open={modal.display}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Do you want to display a modal?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Some Modal content in here
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default Modal;
