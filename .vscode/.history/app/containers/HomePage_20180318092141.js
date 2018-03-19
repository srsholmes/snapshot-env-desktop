// @flow
import React, { Component } from 'react';
import { TitleBar, Toolbar, ToolbarNav, ToolbarNavItem, SearchField } from 'react-desktop/macOs';
import CommitsTable from '../components/CommitsTable';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import styles from './Toolbar.css';

const { dialog } = require('electron').remote;

const iconStyle = {
  width: 70
};

export default class extends Component {
  constructor() {
    super();
    this.state = { selected: 1 };
  }

  handleChange = e => console.log(e.target.value);

  handleClick = n => e => {
    this.setState({ selected: n });
    dialog.showOpenDialog({ BrowserWindow: true, properties: ['openFile', 'openDirectory'] });
  };

  render() {
    return (
      <React.Fragment>
        <TitleBar controls inset title="Snapshot Env" />
        <Toolbar height="60" horizontalAlignment="right" title="Snapshot">
          <ToolbarNav className={styles.toolbar} width="100%">
            <div className={styles.toolbarIcons}>
              <div className={styles.icon}>
                <ToolbarNavItem
                  style={iconStyle}
                  title="Open Project"
                  icon={<FontAwesomeIcon size="lg" icon={['fal', 'folder-open']} />}
                  selected={this.state.selected === 1}
                  onClick={this.handleClick(1)}
                />
              </div>
              <div className={styles.icon}>
                <ToolbarNavItem
                  style={iconStyle}
                  title="Clone Project"
                  icon={<FontAwesomeIcon icon={['fal', 'code-branch']} />}
                  selected={this.state.selected === 2}
                  onClick={this.handleClick(2)}
                />
              </div>
              <div className={styles.icon}>
                <ToolbarNavItem
                  style={iconStyle}
                  title="Fetch"
                  icon={<FontAwesomeIcon icon={['fal', 'code-branch']} />}
                  selected={this.state.selected === 2}
                  onClick={() => this.setState({ selected: 2 })}
                />
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
