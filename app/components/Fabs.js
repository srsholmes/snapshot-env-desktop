// @flow
import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import Button from 'material-ui/Button';
import styled from 'styled-components';

class Fabs extends Component<Props> {
  render() {
    const { actions, commitsTable, className } = this.props;
    const { selectedCommit } = commitsTable;
    const { runSnapshot } = actions;
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
              <FontAwesomeIcon
                size="sm"
                icon={['fas', 'play']}
              />
            </Button>
          </div>
        </div>
      );
    }

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
