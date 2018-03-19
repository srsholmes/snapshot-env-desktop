// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Counter.css';
import { guid, paragraph, time, name } from 'chance';
import 'react-table/react-table.css';
import ReactTable from 'react-table';

type Props = {
  increment: () => void,
  incrementIfOdd: () => void,
  incrementAsync: () => void,
  decrement: () => void,
  counter: number
};

const data = n =>
  Array.from({ length: n }, (x, i) => ({
    author: name,
    message: paragraph,
    commitId: guid,
    commitTime: time,
    myNotes: paragraph
  }));

const columns = [
  {
    Header: 'Commit message',
    accessor: 'message' // String-based value accessors!
  },
  {
    Header: 'Author',
    accessor: 'authore'
  },
  {
    Header: 'Commit Id',
    accessor: 'commitId'
  },
  {
    Header: 'Commit Time',
    accessor: 'commitTime'
  },
  {
    Header: 'My notes',
    accessor: 'myNotes'
  }
];

export default class Counter extends Component<Props> {
  props: Props;

  render() {
    const {
      increment, incrementIfOdd, incrementAsync, decrement, counter
    } = this.props;
    return (
      <div className={styles.tableWrappr}>
        <p>100 Commits found</p>
        <ReactTable data={data} columns={columns} />
      </div>
    );
  }
}
