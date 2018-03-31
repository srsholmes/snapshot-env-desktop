import React from 'react';
import classNames from 'classnames';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import { lighten } from 'material-ui/styles/colorManipulator';
import { withStyles } from 'material-ui/styles';

const TableToolbar = props => {
  const { numSelected, classes, commitsTable, actions } = props;
  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subheading">
            {commitsTable.selectedCommit} selected
          </Typography>
        ) : (
          <Typography variant="title">Select a snapshot to preview:</Typography>
        )}
      </div>
      <div className={classes.searchWrapper}>
        <TextField
          id="search"
          value={commitsTable.searchValue}
          onChange={(e) => actions.setCommitSearchValue(e.target.value)}
          label="Search Table"
          type="search"
          className={classes.textField}
          margin="normal"
        />
      </div>
    </Toolbar>
  );
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  searchWrapper: {
    justifyContent: 'flex-end',
    display: 'flex',
    flex: 1,
    maxWidth: '70%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },

  title: {
    flex: '0 0 auto',
  },
});

export default withStyles(toolbarStyles)(TableToolbar);
