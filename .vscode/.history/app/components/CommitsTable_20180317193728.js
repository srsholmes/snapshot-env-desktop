// @flow
import React, { Component } from 'react';
import { guid, paragraph, time, name } from 'chance';
import ReactTable from 'react-table';
import { makeData } from '../utils/data';
import styles from './Table.css';
import Chance from 'chance';

export default class Counter extends Component<Props> {
  constructor() {
    super();
    this.state = {
      data: makeData(),
      selectedRow: null
    };
    this.renderEditable = this.renderEditable.bind(this);
  }
  renderEditable(cellInfo) {
    return (
      <div
        style={{ backgroundColor: '#fafafa' }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.data];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.data[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }
  render() {
    const { data } = this.state;
    return (
      <div className={styles.tableWrapper}>
        <ReactTable
          showPaginationTop={false}
          showPaginationBottom={false}
          defaultPageSize={40}
          style={{
            height: '620px' // This will force the table body to overflow and scroll, since there is not enough room
          }}
          getTdProps={(state, rowInfo, column, instance) => ({
            onClick: (e, handleOriginal) => {
              console.log('A Td Element was clicked!');
              console.log('it produced this event:', e);
              console.log('It was in this column:', column);
              console.log('It was in this row:', rowInfo);
              this.setState({ selectedRow: rowInfo.index });
              console.log('It was in this table instance:', instance);

              // IMPORTANT! React-Table uses onClick internally to trigger
              // events like expanding SubComponents and pivots.
              // By default a custom 'onClick' handler will override this functionality.
              // If you want to fire the original onClick handler, call the
              // 'handleOriginal' function.
              if (handleOriginal) {
                handleOriginal();
              }
            }
          })}
          data={data}
          columns={[
            {
              columns: [
                {
                  Header: 'Commit message',
                  id: 'commitMessage',
                  accessor: d => d.commitMessage
                },
                {
                  Header: 'Commit id',
                  id: 'commitId',
                  accessor: d => d.commitId
                },
                {
                  Header: 'Commit Date',
                  id: 'commitDate',
                  accessor: d => d.commitDate
                },
                {
                  Header: 'Author',
                  id: 'author',
                  accessor: d => d.author
                },
                {
                  Header: 'My notes',
                  id: 'notes',
                  Cell: this.renderEditable
                }
              ]
            }
          ]}
          className="-striped -highlight"
        />
        <br />
      </div>
    );
  }
}
