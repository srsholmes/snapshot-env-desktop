// @flow
import React, { Component } from 'react';
import { guid, paragraph, time, name } from 'chance';
import ReactTable from 'react-table';
import { makeData } from '../utils/data';
import styles from './Table.css';
import Chance from 'chance';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

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
        style={{ backgroundColor: '#fafafa', color: 'black' }}
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
    const { data, selected } = this.state;
    return (
      <div className={styles.tableWrapper}>
        <ReactTable
          getTrProps={(state, rowInfo) => ({
            onClick: e => {
              this.setState({
                selected: rowInfo.index
              });
            },
            style: {
              background: rowInfo.index === selected ? '#3795FA' : 'white',
              color: rowInfo.index === selected ? 'white' : 'black'
            }
          })}
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
              console.log('It was in this table instance:', instance);
              this.setState({ selectedRow: rowInfo.index });
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
