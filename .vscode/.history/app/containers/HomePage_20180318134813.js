// @flow
import React, { Component } from 'react';
import { connect, type MapStateToProps, type MapDispatchToProps } from 'react-redux';
import { bindActionCreators } from 'redux';

import { TitleBar, Toolbar, ToolbarNav, ToolbarNavItem, SearchField } from 'react-desktop/macOs';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import CommitsTable from '../components/CommitsTable';
import styles from './Toolbar.css';

const { dialog } = require('electron').remote;

const iconStyle = {
  width: 70
};

class Homepage extends Component {
  constructor() {
    super();
    this.state = { selected: 1 };
  }

  handleChange = e => console.log(e.target.value);

  handleClick = n => e => {
    this.setState({ selected: n });
    dialog.showOpenDialog(
      { BrowserWindow: true, properties: ['openFile', 'openDirectory'] },
      path => {
        console.log('Folder CHOSEN ');
        // TODO: set the path in redux
        console.log(path);
      }
    );
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
          <div className={styles.searchWrapper}>
            <SearchField
              style={{ marginRight: '10px' }}
              placeholder="Search"
              defaultValue=""
              onChange={this.handleChange}
            />
          </div>
        </Toolbar>
        <CommitsTable />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps: MapDispatchToProps<Action, OwnProps, DispatchProps> = dispatch => ({
  actions: bindActionCreators({}, dispatch)
});

const mapStateToProps: MapStateToProps<State, OwnProps, StateProps> = state => state;

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
