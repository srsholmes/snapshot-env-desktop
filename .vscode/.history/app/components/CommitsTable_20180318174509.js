// @flow
import React, { Component } from 'react';
import { guid, paragraph, time, name } from 'chance';
import ReactTable from 'react-table';
import { makeData } from '../utils/data';
import styles from './Table.css';
import Chance from 'chance';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

export default class CommitsTable extends Component<Props> {
  constructor() {
    super();
    this.state = {
      data: makeData(),
      selected: null
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
    const { selected, data } = this.state;
    console.log('TABLE PROPS', this.props);
    const { commits } = this.props.git;
    if (!commits.length) return null;
    return (
      <div className={styles.tableWrapper}>
        <ReactTable
          className="-striped -highlight"
          showPaginationTop={false}
          showPaginationBottom={false}
          defaultPageSize={40}
          data={commits}
          getTdProps={(state, rowInfo, column, instance) => ({
            onClick: (e, handleOriginal) => {
              console.log('*******', e);
              console.log({
                state,
                rowInfo,
                column,
                instance
              });
              this.setState({
                selected: rowInfo.index
              });
              if (handleOriginal) {
                handleOriginal();
              }
            },
            style: {
              paddingLeft: '10px',
              background: rowInfo && rowInfo.index === selected ? '#3795FA' : 'white',
              color: rowInfo && rowInfo.index === selected ? 'white' : 'black'
            }
          })}
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
        />
      </div>
    );
  }
}
