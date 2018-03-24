// @flow
import React, { Component } from 'react';
import { connect, type MapStateToProps, type MapDispatchToProps } from 'react-redux';
import { bindActionCreators } from 'redux';

import { TitleBar } from 'react-desktop/macOs';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import CommitsTable from '../components/CommitsTable';
import Toolbar from '../components/Toolbar';
import styles from './Toolbar.css';
import Footer from '../components/Footer';

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
        <Toolbar />
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
