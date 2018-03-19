// @flow
import React, { Component } from 'react';
import { TitleBar, Toolbar, ToolbarNav, ToolbarNavItem, SearchField } from 'react-desktop/macOs';
import CommitsTable from '../components/CommitsTable';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import styles from './Toolbar.css';

const circle = (
  <svg x="0px" y="0px" width="25px" height="25px" viewBox="0 0 25 25">
    <circle cx="12.5" cy="12.5" r="12.5" />
  </svg>
);

const star = (
  <svg x="0px" y="0px" width="25px" height="23.8px" viewBox="0 0 25 23.8">
    <polygon points="12.5,0 16.4,7.8 25,9.1 18.8,15.2 20.2,23.8 12.5,19.7 4.8,23.8 6.2,15.2 0,9.1 8.6,7.8 " />
  </svg>
);

const polygon = (
  <svg x="0px" y="0px" width="25px" height="21.7px" viewBox="0 0 25 21.7">
    <polygon points="6.2,21.7 0,10.8 6.2,0 18.8,0 25,10.8 18.8,21.7 " />
  </svg>
);

export default class extends Component {
  constructor() {
    super();
    this.state = { selected: 1 };
  }

  handleChange = e => console.log(e.target.value);

  render() {
    return (
      <React.Fragment>
        <TitleBar controls inseti title="Snapshot Env" />
        <Toolbar height="60" horizontalAlignment="right" title="Snapshot">
          <ToolbarNav className={styles.toolbar} width="100%">
            <div className={styles.toolbarIcons}>
              <div className={styles.icon}>
                <FontAwesomeIcon icon={['fal', 'folder-open']} />
                <span>Open Porject</span>
                />
              </div>
              <div className={styles.icon}>
                <ToolbarNavItem
                  title="Fetch"
                  selected={this.state.selected === 2}
                  onClick={() => this.setState({ selected: 2 })}
                >
                  <FontAwesomeIcon icon={['fal', 'code-branch']} />
                  <span>Open Porject</span>
                </ToolbarNavItem>
              </div>
            </div>
          </ToolbarNav>
          <SearchField placeholder="Search" defaultValue="" onChange={this.handleChange} />
        </Toolbar>
        <CommitsTable />
      </React.Fragment>
    );
  }
}
