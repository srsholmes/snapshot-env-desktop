// @flow
import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import Button from 'material-ui/Button';
import styled from 'styled-components';
import { openProjectWindow } from '../utils/fileUtils';

class Fabs extends Component<Props> {
  render() {
    const { actions, commitsTable, className } = this.props;
    const { selectedCommit } = commitsTable;
    const { setProjectPath, setConfigInfo, getRepoInfo, runSnapshot } = actions;
    if (selectedCommit) {
      return (
        <div className={className}>
          <div className="container">
            <Button
              onClick={() => runSnapshot()}
              variant="fab"
              color="primary"
              aria-label="add"
            >
              <FontAwesomeIcon size="lg" icon={['fal', 'play']} />
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className={className}>
        <div className="container">
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
      </div>
    );
    return null;
  }
}

const Styled = styled(Fabs)`
  .container {
    position: fixed;
    bottom: 5%;
    right: 5%;
  }

  .openProjectButton {
    height: 70px;
    width: 70px;
  }
`;

export default Styled;
