// @flow
import React, { Component } from 'react';
import { TitleBar, Toolbar, ToolbarNav, ToolbarNavItem, SearchField } from 'react-desktop/macOs';
import CommitsTable from '../components/CommitsTable';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import styles from './Toolbar.css';

const iconStyle = {
  width: 70
};

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
                <ToolbarNavItem
                  style={iconStyle}
                  title="Open Project"
                  icon={<FontAwesomeIcon size="lg" icon={['fal', 'folder-open']} />}
                  selected={this.state.selected === 1}
                  onClick={() => this.setState({ selected: 1 })}
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
