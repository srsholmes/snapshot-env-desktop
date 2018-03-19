// @flow
import React, { Component } from 'react';
import { Window, TitleBar, Text, Toolbar } from 'react-desktop/macOs';

export default class HomePage extends Component {
  render() {
    return (
      <Window chrome height="300px" padding="10px">
        <Toolbar title="Snapshot Environment" controls />
        <Text>Hello World</Text>
      </Window>
    );
  }
}
