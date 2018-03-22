// @flow
import React, { Component } from 'react';
import { connect, type MapStateToProps, type MapDispatchToProps } from 'react-redux';
import { bindActionCreators } from 'redux';

import { TitleBar, Toolbar, ToolbarNav, ToolbarNavItem, SearchField } from 'react-desktop/macOs';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import CommitsTable from '../components/CommitsTable';
import Footer from '../components/Footer';
import styles from './Toolbar.css';
import { gitActions } from '../reducers/git';
import { tableActions } from '../reducers/commitsTable';
import { projectActions } from '../reducers/project';

const simpleGit = require('simple-git/promise');

const { dialog } = require('electron').remote;

const iconStyle = {
  width: 70
};

class Homepage extends Component {
  constructor() {
    super();
    this.state = { selected: null };
  }

  handleChange = e => console.log(e.target.value);

  handleClick = n => async e => {
    const { actions: { setProjectPath, setConfigInfo, getRepoInfo } } = this.props;
    this.setState({ selected: n });
    if (n === 3) {
      const { project } = this.props;
      const repo = await simpleGit(project.path);
      const remote = await repo.listRemote();
      await repo.fetch(remote);
      return;
    }
    dialog.showOpenDialog(
      { BrowserWindow: true, properties: ['openFile', 'openDirectory'] },
      ([path]) => {
        this.setState({ selected: null });
        setProjectPath(path);
        getRepoInfo(path);
        setConfigInfo(path);
      }
    );
  };

  render() {
    const { project: { path } } = this.props;
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
              {path && (
                <div className={styles.icon}>
                  <ToolbarNavItem
                    style={iconStyle}
                    title="Clone Project"
                    icon={<FontAwesomeIcon icon={['fal', 'code-branch']} />}
                    selected={this.state.selected === 2}
                    onClick={this.handleClick(2)}
                  />
                </div>
              )}
              {path && (
                <div className={styles.icon}>
                  <ToolbarNavItem
                    style={iconStyle}
                    title="Fetch"
                    icon={<FontAwesomeIcon icon={['fal', 'code-branch']} />}
                    selected={this.state.selected === 3}
                    onClick={this.handleClick(3)}
                  />
                </div>
              )}
            </div>
          </ToolbarNav>
          {/* TODO: Add in build and output folder text fields here */}
          {/* <div className={styles.searchWrapper}>
            <SearchField
              style={{ marginRight: '10px' }}
              placeholder="Search"
              defaultValue=""
              onChange={this.handleChange}
            />
          </div> */}
        </Toolbar>
        <CommitsTable {...this.props} />
        <Footer {...this.props} />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps: MapDispatchToProps<Action, OwnProps, DispatchProps> = dispatch => ({
  actions: bindActionCreators({ ...tableActions, ...gitActions, ...projectActions }, dispatch)
});

const mapStateToProps: MapStateToProps<State, OwnProps, StateProps> = state => state;

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
