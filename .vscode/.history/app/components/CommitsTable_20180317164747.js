// @flow
import React, { Component } from 'react';
import { guid, paragraph, time, name } from 'chance';
import ReactTable from 'react-table';
import { makeData } from '../utils/data';
import styles from './Table'.
export default class Counter extends Component<Props> {
  constructor() {
    super();
    this.state = {
      data: makeData()
    };
  }
  render() {
    const { data } = this.state;
    return (
      <div className={styles.tableWrapper}>
        <ReactTable
          data={data}
          columns={[
            {
              columns: [
                {
                  Header: 'First Name',
                  accessor: 'firstName'
                },
                {
                  Header: 'Last Name',
                  id: 'lastName',
                  accessor: d => d.lastName
                }
              ]
            },
            {
              columns: [
                {
                  Header: 'Profile Progress',
                  accessor: 'progress',
                  Cell: row => (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#dadada',
                        borderRadius: '2px'
                      }}
                    >
                      <div
                        style={{
                          width: `${row.value}%`,
                          height: '100%',
                          backgroundColor:
                            row.value > 66 ? '#85cc00' : row.value > 33 ? '#ffbf00' : '#ff2e00',
                          borderRadius: '2px',
                          transition: 'all .2s ease-out'
                        }}
                      />
                    </div>
                  )
                },
                {
                  Header: 'Status',
                  accessor: 'status',
                  Cell: row => (
                    <span>
                      <span
                        style={{
                          color:
                            row.value === 'relationship'
                              ? '#ff2e00'
                              : row.value === 'complicated' ? '#ffbf00' : '#57d500',
                          transition: 'all .3s ease'
                        }}
                      >
                        &#x25cf;
                      </span>{' '}
                      {row.value === 'relationship'
                        ? 'In a relationship'
                        : row.value === 'complicated' ? "It's complicated" : 'Single'}
                    </span>
                  )
                }
              ]
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
      </div>
    );
  }
}
