// @flow
import React, { Component } from 'react';
import {
  connect,
  type MapStateToProps,
  type MapDispatchToProps,
} from 'react-redux';
import { bindActionCreators } from 'redux';
import simpleGit from 'simple-git';
import CommitsTable from '../components/CommitsTable/CommitsTable';
import Toolbar from '../components/Toolbar';
import Modal from '../components/Modal'
import Fabs from '../components/Fabs';
import { gitActions } from '../reducers/git';
import { tableActions } from '../reducers/commitsTable';
import { projectActions } from '../reducers/project';
import { openProjectWindow } from '../utils/fileUtils';
import { globalActions } from '../reducers/global';


class Homepage extends Component {
  handleChange = e => console.log(e.target.value);

  handleClick = n => async e => {
    const {
      actions: { setProjectPath, setConfigInfo, getRepoInfo },
    } = this.props;
    if (n === 3) {
      const { project } = this.props;
      const repo = await simpleGit(project.path);
      const remote = await repo.listRemote();
      await repo.fetch(remote);
      return;
    }
    openProjectWindow([setProjectPath, getRepoInfo, setConfigInfo]);
  };

  render() {
    const { project: { path } } = this.props;
    return (
      <React.Fragment>
        <Toolbar {...this.props} />
        {!path && <p>Drag a folder onto the window to get started</p>}
        <CommitsTable {...this.props} />
        <Fabs {...this.props} />
        <Modal {...this.props}/>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps: MapDispatchToProps<
  Action,
  OwnProps,
  DispatchProps
> = dispatch => ({
  actions: bindActionCreators(
    { ...tableActions, ...gitActions, ...projectActions, ...globalActions},
    dispatch
  ),
});

const mapStateToProps: MapStateToProps<State, OwnProps, StateProps> = state =>
  state;

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
