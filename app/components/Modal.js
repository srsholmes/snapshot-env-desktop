import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import { LinearProgress } from 'material-ui/Progress';

class Modal extends React.Component {
  handleClose = () => {
    const { closeModal } = this.props.actions;
    closeModal();
  };

  render() {
    const { global } = this.props;
    const { modal, snapshot } = global;
    return (
      <div>
        <Dialog
          open={modal.display}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {'Building your snapshot 😊'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {snapshot.currentTask}
            </DialogContentText>
          </DialogContent>
          <LinearProgress
            variant="determinate"
            value={snapshot.progress / snapshot.taskLength * 100}
          />
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default Modal;
