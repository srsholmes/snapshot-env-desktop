// @flow
import React, { Component } from 'react';
import { connect, type MapStateToProps, type MapDispatchToProps } from 'react-redux';
import { bindActionCreators } from 'redux';

import { TitleBar, Toolbar, ToolbarNav, ToolbarNavItem, SearchField } from 'react-desktop/macOs';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import CommitsTable from '../components/CommitsTable';
import styles from './Toolbar.css';
import { gitActions } from '../reducers/git';
import { projectActions } from '../reducers/project';
import git from 'nodegit';

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

  handleClick = n => e => {
    console.log(this.props);
    this.setState({ selected: n });
    dialog.showOpenDialog(
      { BrowserWindow: true, properties: ['openFile', 'openDirectory'] },
      path => {
        console.log('Folder CHOSEN ');
        // TODO: set the path in redux
        console.log(path);
        this.props.actions.setProjectPath(path);
        Git.Repository.open('tmp')
          // Open the master branch.
          .then((repo) => repo.getMasterCommit())
          // Display information about commits on master.
          .then((firstCommitOnMaster) => {
            // Create a new history event emitter.
            const history = firstCommitOnMaster.history();

            // Create a counter to only show up to 9 entries.
            let count = 0;

            // Listen for commit events from the history.
            history.on('commit', (commit) => {
              // Disregard commits past 9.
              if (++count >= 9) {
                return;
              }

              // Show the commit sha.
              console.log(`commit ${commit.sha()}`);

              // Store the author object.
              const author = commit.author();

              // Display author information.
              console.log(`Author:\t${author.name()} <${author.email()}>`);

              // Show the commit date.
              console.log(`Date:\t${commit.date()}`);

              // Give some space and show the message.
              console.log(`\n    ${commit.message()}`);
            });

            // Start emitting events.
            history.start();
          });
      }
    );
  };

  render() {
    console.log('((((((((((object))))))))))');
    console.log(this.props);
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
        <CommitsTable {...this.props} />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps: MapDispatchToProps<Action, OwnProps, DispatchProps> = dispatch => ({
  actions: bindActionCreators({ ...gitActions, ...projectActions }, dispatch)
});

const mapStateToProps: MapStateToProps<State, OwnProps, StateProps> = state => state;

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
