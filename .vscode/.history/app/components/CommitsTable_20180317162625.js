// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Counter.css';
import { guid, paragraph } from 'chance';

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

export default class Counter extends Component<Props> {
  props: Props;

  render() {
    const {
      increment, incrementIfOdd, incrementAsync, decrement, counter
    } = this.props;
    return (
      <div className={styles.tableWrappr}>
        <p>100 Commits found</p>
      </div>
    );
  }
}
