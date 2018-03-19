// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Counter.css';
import { guid, paragraph } from 'chance';
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
    guid,
    message: paragraph
  }));

const columns = [
  {
    Header: 'Commit message',
    accessor: '' // String-based value accessors!
  },
  {
    Header: 'Athor',
    accessor: 'age'
  },
  {
    Header: 'Commit Id',
    accessor: 'commitId'
  },
  {
    Header: props => <span>Friend Age</span>, // Custom header components!
    accessor: 'friend.age'
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
