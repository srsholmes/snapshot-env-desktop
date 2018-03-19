// @flow
import React, { Component } from 'react';
import Home from '../components/Home';
import { Window, TitleBar, Text } from 'react-desktop/macOs';

export default class HomePage extends Component {
  render() {
    return (
      <Window chrome height="300px" padding="10px">
        <TitleBar title="untitled text 5" controls />
        <Text>Hello World</Text>
      </Window>
    );
  }
}
