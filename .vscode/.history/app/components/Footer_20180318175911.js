// @flow
import React, { Component } from 'react';
import { guid, paragraph, time, name } from 'chance';
import ReactTable from 'react-table';
import { makeData } from '../utils/data';
import styles from './Footer.css';
import Chance from 'chance';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { TitleBar, Toolbar, ToolbarNav, ToolbarNavItem, SearchField } from 'react-desktop/macOs';

export default class Footer extends Component<Props> {
  constructor() {
    super();
  }
  render() {
    console.log('Footer PROPS', this.props);
    return (
      <div className={styles.footer}>
        <p>Footer</p>
      </div>
    );
  }
}
