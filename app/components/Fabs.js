// @flow
import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import styles from './Fabs.css';
import Button from 'material-ui/Button';
import { openProjectWindow } from '../utils/fileUtils';

export default class Fabs extends Component<Props> {
  render() {
    const { actions, commitsTable } = this.props;
    const { selectedCommit } = commitsTable;
    const { setProjectPath, setConfigInfo, getRepoInfo, runSnapshot } = actions;
    if (selectedCommit) {
      return (
        <div className={styles.container}>
          <Button
            onClick={() => runSnapshot()}
            variant="fab"
            color="primary"
            aria-label="add"
          >
            <FontAwesomeIcon size="lg" icon={['fal', 'heart']} />
          </Button>
        </div>
      );
    }

    return (
      <div className={styles.container}>
        <Button
          variant="fab"
          color="primary"
          aria-label="add"
          onClick={() =>
            openProjectWindow([setProjectPath, setConfigInfo, getRepoInfo])
          }
        >
          <FontAwesomeIcon size="lg" icon={['fal', 'folder-open']} />
        </Button>
      </div>
    );
    return null;
  }
}
