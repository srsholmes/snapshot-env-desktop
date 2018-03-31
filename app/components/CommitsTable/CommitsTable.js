import React from 'react';
import { withStyles } from 'material-ui/styles';
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  TableRow,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import Toolbar from './Toolbar';
import Head from './Head';

class EnhancedTable extends React.Component {
  handleRequestSort = (event, val) => {
    this.props.actions.sortTableRow(val);
  };

  handleClick = (event, id) => {
    this.props.actions.setActiveRow(id);
  };

  handleChangePage = (event, page) => {
    this.props.actions.changePage(page);
  };

  handleChangeRowsPerPage = event => {
    this.props.actions.changeRowsPerPage(event.target.value);
  };

  isSelected = id => this.props.commitsTable.selected.indexOf(id) !== -1;

  render() {
    const { project: { path } } = this.props;
    const {
      order,
      orderBy,
      commits,
      rowsPerPage,
      page,
      selected,
    } = this.props.commitsTable;
    const { classes } = this.props;
    if (!path) return null;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, commits.length - page * rowsPerPage);
    return (
      <Paper className={classes.root}>
        <Toolbar {...this.props} numSelected={selected.length} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <Head
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={commits.length}
            />
            <TableBody>
              {commits
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n.id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell>

                      <TableCell padding="none">{n.commitMessage}</TableCell>
                      <TableCell numeric>{n.commitId}</TableCell>
                      <TableCell numeric>{n.commitDate}</TableCell>
                      <TableCell numeric>{n.author}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={6}
                  count={commits.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  backIconButtonProps={{
                    'aria-label': 'Previous Page',
                  }}
                  nextIconButtonProps={{
                    'aria-label': 'Next Page',
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    );
  }
}

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: '5%',
  },
  table: {
    minWidth: 800,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
    paddingBottom: 20,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

export default withStyles(styles)(EnhancedTable);
