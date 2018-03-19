// @flow
import React, { Component } from 'react';
import { guid, paragraph, time, name } from 'chance';
import ReactTable from 'react-table';
import { makeData } from '../utils/data';
import styles from './Table.css';
import Chance from 'chance';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

export default class Footer extends Component<Props> {
  constructor() {
    super();
  }
  render() {
    console.log('TABLE PROPS', this.props);
    return (
      <div className={styles.tableWrapper}>
        <p>Footer</p>
      </div>
    );
  }
}
