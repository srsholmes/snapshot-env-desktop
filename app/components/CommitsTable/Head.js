// @flow
import React from 'react';
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';
import Tooltip from 'material-ui/Tooltip';

type Props = {
  numSelected: number,
  onRequestSort: Function,
  onSelectAllClick: Function,
  order: string,
  orderBy: string,
  rowCount: number,
};

const columnData = [
  {
    id: 'commitMessage',
    numeric: false,
    disablePadding: true,
    label: 'Commit Message',
  },
  { id: 'commitId', numeric: true, disablePadding: false, label: 'Commit ID' },
  {
    id: 'commitDate',
    numeric: true,
    disablePadding: false,
    label: 'Commit Date',
  },
  { id: 'author', numeric: false, disablePadding: false, label: 'Author' },
];

class Head extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox" />
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

export default Head;
