// @flow
import React, { Component } from 'react';
import { guid, paragraph, time, name } from 'chance';
import ReactTable from 'react-table';
import { makeData } from '../utils/data';
import styles from './Table.css';
import Chance from 'chance';

const c = new Chance();
const getRandomNote = arr => {
  let copy = arr.slice(0);
  return function () {
    if (copy.length < 1) {
      copy = arr.slice(0);
    }
    const index = Math.floor(Math.random() * copy.length);
    const item = copy[index];
    copy.splice(index, 1);
    return item;
  };
};

const getReviewStatus = row => (row.value === 0 ? 'yes' : 'no');

const NOTES = [
  'Looks great 😊',
  'Needs more work',
  'Broken on Android 😕',
  'Header needs tweaking',
  'Crashed my chrome',
  'Ship it',
  'Has been reviewed 😊',
  `See jira VP-${c.integer({ min: 100, max: 150 })}`,
  'Love it ❤️'
];
const randomComment = getRandomNote(NOTES);
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
                  Header: 'My notes',
                  accessor: 'notes',
                  Cell: () => <span>{randomComment()}</span>
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
