import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import { LinearProgress } from 'material-ui/Progress';
import styled from 'styled-components';

class Modal extends React.Component {
  handleClose = () => {
    const { closeModal, setSnapshotMessage } = this.props.actions;
    closeModal();
    setSnapshotMessage('', 0);
  };

  render() {
    const { global, className } = this.props;
    const { modal, snapshot } = global;
    return (
      <div>
        <Dialog
          open={modal.display}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{modal.message.content}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {snapshot.currentTask}
            </DialogContentText>
          </DialogContent>
          <LinearProgress
            className={className}
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
const Styled = styled(Modal)`
  width: 90%;
  margin: auto;
`;
export default Styled;
