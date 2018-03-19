// @flow
import React, { Component } from 'react';
import { Window, TitleBar, Text, Toolbar } from 'react-desktop/macOs';

export default class extends Component {
  render() {
    return (
      <TitleBar controls inset>
        <Toolbar height="60" horizontalAlignment="center" title="Snapshot">
          <ToolbarNav>
            <ToolbarNavItem
              title="Item 1"
              icon={circle}
              selected={this.state.selected === 1}
              onClick={() => this.setState({ selected: 1 })}
            />
            <ToolbarNavItem
              title="Item 2"
              icon={star}
              selected={this.state.selected === 2}
              onClick={() => this.setState({ selected: 2 })}
            />
            <ToolbarNavItem
              title="Item 3"
              icon={polygon}
              selected={this.state.selected === 3}
              onClick={() => this.setState({ selected: 3 })}
            />
          </ToolbarNav>
        </Toolbar>
      </TitleBar>
    );
  }
}
