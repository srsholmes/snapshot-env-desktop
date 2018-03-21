// @flow
import React, { Component } from 'react';
import ReactTable from 'react-table';
import styles from './Footer.css';
import { Button } from 'react-desktop/macOs';

export default class Footer extends Component<Props> {
  render() {
    const { runSnapshot } = this.props.actions;
    return (
      <div className={styles.footer}>
        <Button color="blue" onClick={() => runSnapshot()}>
          Run snapshot
        </Button>
      </div>
    );
  }
}
