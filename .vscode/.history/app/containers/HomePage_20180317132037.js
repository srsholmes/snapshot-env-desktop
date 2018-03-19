// @flow
import React, { Component } from 'react';
import { Window, TitleBar, Text, Toolbar } from 'react-desktop/macOs';

export default class extends Component {
  render() {
    return (
      <TitleBar controls inset>
        <Toolbar height="143" horizontalAlignment="center" />
      </TitleBar>
    );
  }
}
