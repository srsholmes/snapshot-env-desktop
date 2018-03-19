// @flow
import React, { Component } from 'react';
import { guid, paragraph, time, name } from 'chance';
import ReactTable from 'react-table';
import { makeData } from '../utils/data';
import styles from './Table.css';

const getRandomNote = arr => arr[Math.floor(Math.random() * arr.length)];


const NOTES =[
    'Looks great 😊',
    'Needs more work',
    'Broken on Android 😕',
    'Header needs tweaking',
    'Crashed my chrome',
    'Ship it',
    'Has been reviewed 😊'
    'See jira VP-134',
    'Love it ❤️'
]
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
          getTdProps={(state, rowInfo, column, instance) => ({
            onClick: (e, handleOriginal) => {
              console.log('A Td Element was clicked!');
              console.log('it produced this event:', e);
              console.log('It was in this column:', column);
              console.log('It was in this row:', rowInfo);
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
                  Header: 'Review',
                  accessor: 'review',
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
                  Header: 'My notes',
                  accessor: 'notes',
                  Cell: row => <span>{getRandomNote(NOTES)}</span>
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
